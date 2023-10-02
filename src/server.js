import express from 'express'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

const hostname = process.env.APP_HOST || 'localhost'
const port = process.env.APP_PORT || 8017
const appname = process.env.APP_NAME || 'TVKG'

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1><hr>')
})

app.listen(port, hostname, () => {
  // eslint-disable-next-line no-console
  console.log(`Hello ${appname}, I am running at ${ hostname }:${ port }/`)
})
