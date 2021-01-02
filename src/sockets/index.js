import SocketIo from 'socket.io'

export default function generateSocket(server) {
  const io = new SocketIo.Server(server)
  const logedNameSpace = io.of('/chat')

  logedNameSpace.use((socket, next) => {
    next()
  })

  logedNameSpace.on('connection', socket => {
    console.log('user connected')

    socket.on('disconnect', () => {
      console.log('user disconnect')
    })
  })
}
