import { db } from '../db'

// adiciona relation no resultado

export default () => {
  return async (req: any, res: any, next: any) => {
    try {
      const offset = Number(req.query.offset) || 0
      const limit = Number(req.query.limit) || 200
      const orderBy =
        req.query.order_by && req.query.order_by.length
          ? req.query.order_by.map((o: any) => JSON.parse(o))
          : []

      const withName = (queryBuilder: any) => {
        if (req.query.name) {
          queryBuilder.whereILike('name', `${req.query.name}%`)
        }
      }

      const result = await db
        .select(db.raw('expense.*, json_agg(product) as product'))
        .limit(limit)
        .offset(offset)
        .from('expense')
        .groupBy('expense.id')
        .join('product', 'expense.product_id', 'product.id')
        .modify(withName)
        .orderBy(orderBy)
      return res.json(result)
    } catch (err) {
      next(err)
    }
  }
}
