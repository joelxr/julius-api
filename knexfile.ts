import type { Knex } from 'knex'

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection:
      'postgresql://postgres:RJ3OIsCulTgxSnyNXwG5@containers-us-west-84.railway.app:6599/railway',
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
