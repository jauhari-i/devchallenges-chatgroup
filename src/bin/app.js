import express from 'express'
import configureApp from '../config/configureApp'
import { getConfig } from '../config/global_config'
import connectMongo from '../db/mongoConnection'
import http from 'http'
import mongoose from 'mongoose'

const port = getConfig('/port')
const app = express()
const server = http.createServer(app)

configureApp(app)
connectMongo(mongoose)

server.listen(port, () => {
  console.log('Server is running on port ' + port)
})
