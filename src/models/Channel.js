import timeStamp from 'mongoose-timestamp'
import mongoose from 'mongoose'

const channelSchema = new mongoose.Schema({
  channelId: {
    type: String,
    required: true
  },
  channelName: {
    type: String,
    required: true,
    unique: true
  },
  channelDesc: {
    type: String,
    required: true
  },
  channelInitial: {
    type: String,
    required: true
  }
})

channelSchema.plugin(timeStamp)

const Channel = mongoose.model('chatroom', channelSchema)

export default Channel