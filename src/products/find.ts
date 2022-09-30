import { db } from '../db'

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

      const withDateInterval = (queryBuilder: any) => {
        if (req.query.start && req.query.end) {
          queryBuilder.whereRaw('expense.date between ? and ?', [
            req.query.start,
            req.query.end,
          ])
        }
      }

      const result = await db
        .select(
          db.raw(
            `product.*,
             count(expense) as count,
             sum(expense.count) as product_count,
             sum(expense.count * expense.unit_price) as subtotal,
             sum(expense.count * expense.unit_price - coalesce(expense.discount, 0)) as total,
             sum(expense.discount) as discount,
             min(expense.unit_price) as min,
             max(expense.unit_price) as max,
             avg(expense.unit_price) as avg`
          )
        )
        .modify(withName)
        .modify(withDateInterval)
        .limit(limit)
        .offset(offset)
        .from('product')
        .groupBy('product.id')
        .join('expense', 'expense.product_id', 'product.id')
        .orderBy(orderBy)
      return res.json(result)
    } catch (err) {
      next(err)
    }
  }
}
