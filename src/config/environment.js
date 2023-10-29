import 'dotenv/config'

export const env = {
  APP_HOST: process.env.APP_HOST || 'localhost',
  APP_PORT: process.env.APP_PORT || 8017,
  APP_NAME: process.env.APP_NAME || 'TVKG',
  DATABASE_NAME: process.env.DATABASE_NAME || 'tvkg-realtime-chat',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/tvkg-realtime-chat?retryWrites=true&w=majority',
  BUILD_MODE: process.env.BUILD_MODE
}
