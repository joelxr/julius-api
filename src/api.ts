import express, { Application } from 'express'
import cors from 'cors'
import humps from 'humps'
import tags from './tags'
import products from './products'
import productTags from './product-tags'
import expenses from './expenses'
import { isValidApiKey } from './auth'

const app: Application = express()
const port: number = Number(process.env.PORT) | 8091

app.use(express.json())
app.use(cors())
app.use((req: any, res: any, next: any) => {
  if (req.body && typeof req.body === 'object') {
    req.body = humps.decamelizeKeys(req.body)
  }

  if (req.query && typeof req.query === 'object') {
    req.query = humps.decamelizeKeys(req.query)
  }

  const sendJson = res.json
  res.json = (data: any) => {
    return sendJson.call(res, humps.camelizeKeys(data))
  }

  next()
})
app.use((err: any, req: any, res: any, next: any) => {
  res.status(500).json({ message: err.message })
})

app.use(async (req: any, res: any, next: any) => {
  const apiKey = req.headers['api-key']

  if (!(await isValidApiKey(apiKey))) {
    return res.status(401).json({ message: 'Invalid API Key' })
  }

  next()
})

app.use('/tags', tags)
app.use('/products', products)
app.use('/product-tags', productTags)
app.use('/expenses', expenses)

app.listen(port, '0.0.0.0', function () {
  console.log(`Service is listening to port ${port}...`)
})
