import Knex from 'knex'

export const db = Knex({
  client: 'pg',
  connection:
    'postgresql://postgres:RJ3OIsCulTgxSnyNXwG5@containers-us-west-84.railway.app:6599/railway',
  pool: {
    min: 2,
    max: 10,
  },
})
