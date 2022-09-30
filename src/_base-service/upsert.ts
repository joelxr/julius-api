import { db } from '../db'

export default (name: string) => {
  return async (req: any, res: any, next: any) => {
    try {
      const id = Number(req.body.id)
      if (id) {
        const result = await db(name)
          .where({ id })
          .returning('id')
          .update(req.body)
        return res.json(result)
      } else {
        const result = await db(name).returning('id').insert(req.body)
        return res.json(result)
      }
    } catch (err) {
      next(err)
    }
  }
}
