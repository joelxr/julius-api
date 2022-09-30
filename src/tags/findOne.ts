import { db } from '../db'

export default () => {
  return async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params
      const result = await db
        .select(
          db.raw(
            `tag.*,
             count(expense) as count,
             sum(expense.count) as product_count,
             sum(expense.count * expense.unit_price) as subtotal,
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
        .from('tag')
        .where(`tag.id`, '=', id)
        .groupBy('tag.id')
        .join('product_tags', 'product_tags.tag_id', 'tag.id')
        .join('product', 'product.id', 'product_tags.product_id')
        .join('expense', 'expense.product_id', 'product.id')
        .first()
      return res.json(result)
    } catch (err) {
      next(err)
    }
  }
}
