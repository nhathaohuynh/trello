// import { createClient, RedisClientType } from 'redis'
// import { db } from '../configs/config-env'
// const STATUS_REDIS = {
//   END: 'end',
//   RECONNECT: 'reconnecting',
//   ERROR: 'error'
// }

// class RedisService {
//   private static instance: RedisService
//   private client: RedisClientType

//   private constructor() {
//     this.client = createClient({ url: db.redis_url })
//     this.connect()
//   }

//   private connect(): void {
//     this.setupEventHandler()
//     this.client
//       .connect()
//       .then(() => {
//         console.log('Redis connection status: connected')
//       })
//       .catch((err: unknown) => {
//         console.error('Failed to connect to Redis:', err)
//       })
//   }

//   private setupEventHandler(): void {
//     this.client.on(STATUS_REDIS.END, () => {
//       console.log('Redis connection status: ended')
//     })

//     this.client.on(STATUS_REDIS.ERROR, (err: Error) => {
//       console.log('Redis connection status: error', err)
//     })

//     this.client.on(STATUS_REDIS.RECONNECT, () => {
//       console.log('Redis connection status: reconnecting')
//     })
//   }

//   static getClient(): RedisClientType {
//     // Singleton pattern
//     if (!this.instance) {
//       this.instance = new RedisService()
//     }
//     return this.instance.client
//   }

//   static close(): void {
//     const client = this.getClient()
//     client
//       .quit()
//       .then(() => {
//         console.log('Redis client disconnected')
//       })
//       .catch((err: unknown) => {
//         console.error('Failed to disconnect Redis client:', err)
//       })
//   }
// }

// export default RedisService
