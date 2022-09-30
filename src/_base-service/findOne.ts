import { db } from '../db'

export default (name: string) => {
  return async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params
      const result = await db
        .select()
        .from(name)
        .where(`${name}.id`, '=', id)
        .first()
      return res.json(result)
    } catch (err) {
      next(err)
    }
  }
}
