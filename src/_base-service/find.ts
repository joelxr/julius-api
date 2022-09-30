import { db } from '../db'

export default (tableName: string) => {
  return async (req: any, res: any, next: any) => {
    try {
      const offset = Number(req.query.offset) || 0
      const limit = Number(req.query.limit) || 200

      const withName = (queryBuilder: any) => {
        if (req.query.name) {
          queryBuilder.whereILike('name', `${req.query.name}%`)
        }
      }

      const orderBy =
        req.query.order_by && req.query.order_by.length
          ? req.query.order_by.map((o: any) => JSON.parse(o))
          : []

      const result = await db
        .limit(limit)
        .offset(offset)
        .from(tableName)
        .modify(withName)
        .orderBy(orderBy)

      return res.json(result)
    } catch (err) {
      next(err)
    }
  }
}
