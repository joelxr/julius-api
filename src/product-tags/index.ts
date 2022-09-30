import express from 'express'
import find from './find'
import { findOne, upsert, remove } from '../_base-service'

const router = express.Router()

router.get('/', find())
router.get('/:id', findOne('product_tags'))
router.post('/', upsert('product_tags'))
router.delete('/:id', remove('product_tags'))

export default router
