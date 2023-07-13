# movsci

Stream ascii movies from a Hypercore

```
npm install -g movsci
movsci <key-to-a-ascii-movie>
```

The format is `<relative-timestamp-4-bytes-le><the frame>`

To start at a specific frame do

```
movsci <key-to-a-ascii-movie> <start-frame>
```
