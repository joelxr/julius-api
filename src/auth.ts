import { db } from './db'
export async function isValidApiKey(key: string): Promise<boolean> {
  const result = await db
    .select()
    .from('service_accounts')
    .where(`key`, '=', key)
    .first()
  console.log(result)
  return !!result
}
