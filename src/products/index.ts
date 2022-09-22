import express from 'express'
import { service } from '../serviceBuilder'

const router = express.Router()
const productService = service('product')

router.get('/', productService.find())
router.get('/:id', productService.findOne())
router.post('/', productService.upsert())
router.delete('/:id', productService.remove())
export default router
