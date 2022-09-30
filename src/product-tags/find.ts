import { db } from '../db'

export default () => {
  return async (req: any, res: any, next: any) => {
    try {
      const { product_id } = req.query
      const result = await db
        .select()
        .from('product_tags')
        .where('product_id', '=', Number(product_id))
      return res.json(result)
    } catch (err) {
      next(err)
    }
  }
}
