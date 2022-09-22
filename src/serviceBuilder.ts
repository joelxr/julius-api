import { db } from './db'

export function service(name: string) {
  return builder(store(name))
}

function store(name: string) {
  return {
    find: async function ({ limit = 50, offset = 0, where = {} } = {}): Promise<
      any[]
    > {
      return await db
        .select()
        .limit(limit)
        .offset(offset)
        .from(name)
        .where(where)
    },

    upsert: async function (data: any): Promise<any> {
      if (data.id) {
        return await db(name)
          .where({ id: data.id })
          .returning('id')
          .update(data)
      }

      return await db(name).returning('id').insert(data)
    },

    remove: async function (id: number) {
      await db(name).where({ id }).delete()
    },
  }
}

function builder(store: any) {
  return {
    find() {
      return async (res: any, req: any, next: any) => {
        try {
          const offset = Number(req.query.offset)
          const limit = Number(req.query.limit)
          const { where } = req.query
          return res.json(await store.find({ offset, limit, where }))
        } catch (err) {
          next(err)
        }
      }
    },
    findOne() {
      return async (req: any, res: any, next: any) => {
        try {
          const { id } = req.params
          return res.json(await store.find({ where: { id } }))
        } catch (err) {
          next(err)
        }
      }
    },
    upsert() {
      return async (req: any, res: any, next: any) => {
        try {
          return res.json(await store.upsert(req.body))
        } catch (err) {
          next(err)
        }
      }
    },
    remove() {
      return async (req: any, res: any, next: any) => {
        try {
          const { id } = req.params
          return res.json(await store.remove(Number(id)))
        } catch (err) {
          next(err)
        }
      }
    },
  }
}
