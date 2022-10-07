import { db } from '../db'

export default () => {
  return async (req: any, res: any, next: any) => {
    try {
      const result = await db.raw(
        `select
          'Última semana' as ref,
          'd7' as id,
          to_char(current_date - 7, 'YYYY-MM-DD') as start,
          to_char(current_date, 'YYYY-MM-DD') as end,
          sum(e.count * e.unit_price - coalesce(e.discount, 0)) as total
        from expense e where e."date" >= current_date - 7
        union
        select
          'Últimos quinze dias' as ref,
          'd15' as id,
          to_char(current_date - 15, 'YYYY-MM-DD') as start,
          to_char(current_date, 'YYYY-MM-DD') as end,
          sum(e.count * e.unit_price - coalesce(e.discount, 0)) as total
        from expense e where e."date" >= current_date - 15
        union
        select
          ref,
          ref,
          to_char(to_date(t.ref, 'YYYY-MM'), 'YYYY-MM-DD') as start,
          to_char(to_date(t.ref, 'YYYY-MM') + interval '1 month' - interval '1 day', 'YYYY-MM-DD') as end,
          total
        from (
          select
            to_char(date_trunc('year', e.date), 'YYYY') || '-' || to_char(date_trunc('month', e.date), 'MM') as ref,
            current_date  as end,
            sum(e.count * e.unit_price - coalesce(e.discount, 0)) as total
          from expense e group by date_trunc('year', e.date), date_trunc('month', e.date) order by ref desc
        ) t
        order by id desc`
      )
      return res.json(result.rows)
    } catch (err) {
      next(err)
    }
  }
}
