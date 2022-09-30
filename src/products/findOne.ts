import { db } from '../db'

export default () => {
  return async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params
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
             avg(expense.unit_price) as avg,
             json_agg(json_build_object(
               'id', expense.id,
               'date', expense.date,
               'count', expense.count,
               'unit_price', expense.unit_price,
               'discount', expense.discount,
               'product_name', product.name
             )) as expenses`
          )
        )
        .from('product')
        .where(`product.id`, '=', id)
        .groupBy('product.id')
        .join('expense', 'expense.product_id', 'product.id')
        .first()
      return res.json(result)
    } catch (err) {
      next(err)
    }
  }
}
