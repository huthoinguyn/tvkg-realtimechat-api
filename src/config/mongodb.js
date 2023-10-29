import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

let tvkgChatDB = null

const client = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  try {
    await client.connect()
    tvkgChatDB = client.db(env.DATABASE_NAME || 'tvkg-realtime-chat')
    console.log('Connected successfully to server')
  } catch (error) {
    console.log(error)
  }
}

export const DISCONNECT_DB = async () => {
  try {
    await client.close()
    console.log('Disconnected successfully to server')
  } catch (error) {
    console.log(error)
  }
}

export const GET_DB = () => {
  if (!tvkgChatDB) throw new Error('Call CONNECT_DB first')
  return tvkgChatDB
}
