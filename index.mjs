#!/usr/bin/env node

import Hypercore from 'hypercore'
import Hyperswarm from 'hyperswarm'
import goodbye from 'graceful-goodbye'

const k = process.argv[2]

if (!k) {
  console.error('Usage: movsci <key> <start-frame?>')
  process.exit(1)
}

const core = new Hypercore('./movsci', k)
const swarm = new Hyperswarm()

await core.ready()

swarm.on('connection', c => core.replicate(c))
swarm.join(core.discoveryKey)

goodbye(() => swarm.destroy())

const start = Number(process.argv[3]) || 0

const stream = core.createReadStream({ start })

let prev = 0
for await (const data of stream) {
  const time = data.readUint32LE(0)

  if (prev) {
    await new Promise(resolve => setTimeout(resolve, time - prev))
  }
  prev = time

  process.stdout.write(data.subarray(4))
}
