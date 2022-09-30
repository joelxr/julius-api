import { db } from '../db'

export default (name: string) => {
  return async (req: any, res: any, next: any) => {
    try {
      const id = Number(req.params.id)
      const result = await db(name).where({ id }).delete()
      return res.json(result)
    } catch (err) {
      next(err)
    }
  }
}
