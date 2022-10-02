import type { Knex } from 'knex'

const connection = process.env.DB_CONNECTION

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
    },
  },
}

export default config
