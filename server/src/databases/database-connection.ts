import { Db, MongoClient, ServerApiVersion } from 'mongodb'
import env from '~/config/env.config'
import { BadRequest } from '~/utils/error-response.util'

export class Database {
  private static instance: Database
  private client: MongoClient
  private db: Db | null = null
  private readonly uri: string
  private readonly dbName: string

  private constructor() {
    this.uri = env.DB_URI
    this.dbName = env.DB_NAME
    this.client = new MongoClient(this.uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    this.client.connect()
  }

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  async connect(): Promise<void> {
    if (this.db) {
      return
    }

    try {
      await this.client.connect()
      this.db = this.client.db(this.dbName)
      console.log(`Connected to the database: ${this.dbName}`)
    } catch (err) {
      console.error('Failed to connect to the database:', err)
      throw new BadRequest('Database connection failed')
    }
  }

  getDatabase(): Db {
    if (!this.db) {
      throw new BadRequest('Database is not connected')
    }
    return this.db
  }

  async close(): Promise<void> {
    if (this.client) {
      await this.client.close()
      this.db = null
    }
  }
}

const dbInstance = Database.getInstance()

export { dbInstance }
