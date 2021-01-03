import SocketIo from 'socket.io'
import { verifySocket } from '../auth/jwt_auth_instance'
import services from '../services'

const { SocketInstance } = services

export default function generateSocket(server) {
  const io = new SocketIo.Server(server)

  const logedNameSpace = io.of('/chat')

  logedNameSpace
    .use(async (socket, next) => {
      if (socket.handshake.query && socket.handshake.query.token) {
        const user = await verifySocket(socket.handshake.query.token)
        if (!user) {
          return next(new Error('Authentication error'))
        } else {
          socket.user = user
          next()
        }
      } else {
        next(new Error('Authentication error'))
      }
    })
    .on('connection', socket => {
      const user = socket.user

      const online = SocketInstance.SetOnline(user.sub)
      if (online) {
        console.log('User connected')
        logedNameSpace.emit('connection', 'Hello')
      } else {
        console.log('Failed to connect')
      }

      socket.on('disconnect', () => {
        const offline = SocketInstance.SetOffline(user.sub)
        if (offline) {
          console.log('user disconnect')
        }
      })
    })
}
