import express from 'express'
import { service } from '../serviceBuilder'

const router = express.Router()
const expenseService = service('expense')

router.get('/', expenseService.find())
router.get('/:id', expenseService.findOne())
router.post('/', expenseService.upsert())
router.delete('/:id', expenseService.remove())
export default router
