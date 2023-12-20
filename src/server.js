/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import { env } from '~/config/environment'
import { CONNECT_DB, DISCONNECT_DB } from '~/config/mongodb'
import exitHook from 'async-exit-hook'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'
import { initSocket } from '~/sockets/index'
import { corsOptions } from '~/config/cors'
import http from 'http'

const APP_START = () => {
  const app = express()

  const server = http.createServer(app)

  initSocket(server)

  app.use(cors(corsOptions))

  app.use(express.json())

  app.use('/v1', APIs_V1)

  app.use(errorHandlingMiddleware)

  server.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hello ${env.APP_NAME}, I am running at ${env.APP_HOST}:${env.APP_PORT}/`)
  })
}

;(async () => {
  try {
    await CONNECT_DB()
    console.log('Connected successfully to server')
    APP_START()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

exitHook(async () => {
  console.log('Disconnected successfully to server')
  await DISCONNECT_DB()
})

