import { db } from '../db'

export default () => {
  return async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params
      const result = await db
        .select(
          db.raw(
            `expense.*,
             expense.count * expense.unit_price - coalesce(expense.discount, 0) as total,
             json_agg(product) as product`
          )
        )
        .from('expense')
        .groupBy('expense.id')
        .where('expense.id', '=', Number(id))
        .join('product', 'expense.product_id', 'product.id')
        .first()
      return res.json(result)
    } catch (err) {
      next(err)
    }
  }
}
