import User from '../../models/User'

const SetOffline = async (id) => {
  const offline = await User.findOneAndUpdate({ userId: id}, {online: false, lastLogin: Date.now()})
  if(offline){
    return offline
  } else{
    return false
  }
}

export default SetOffline