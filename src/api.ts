import express, { Application } from 'express'
import tags from './tags'
import products from './products'
import expenses from './expenses'

const app: Application = express()
const port: number = Number(process.env.PORT) | 8091

app.use(express.json())
app.use((err: any, req: any, res: any, next: any) => {
  res.status(500).json({ message: err.message })
})

app.use('/tags', tags)
app.use('/products', products)
app.use('/expenses', expenses)

app.listen(port, function () {
  console.log(`Service is listening to port ${port}...`)
})
