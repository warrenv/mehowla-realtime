import io from 'socket.io'

const NAMESPACE = '/songs'
const port = process.PORT || 9000

const socket = io.listen(port)
const namespace = socket.of(NAMESPACE)

namespace.on('connection', client => {
  client.on('selectSong', data => {
    console.log(`selectSong: ${JSON.stringify(data)}`)
    namespace.emit('songSelected', { ...data, timestamp: (new Date()).toISOString() })
  })
})
