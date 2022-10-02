import Knex from 'knex'

const connection = process.env.DB_CONNECTION

console.log('1',connection)

export const db = Knex({
  client: 'pg',
  connection,
  pool: {
    min: 2,
    max: 10,
  },
})
