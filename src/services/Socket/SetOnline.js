import User from '../../models/User'

const SetOnline = async (id) => {
  const online = await User.findOneAndUpdate({ userId: id}, {online: true})
  if(online){
    return online
  } else{
    return false
  }
}

export default SetOnline