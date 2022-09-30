import express from 'express'
import find from './find'
import { findOne, upsert, remove } from '../_base-service'

const router = express.Router()

router.get('/', find())
router.get('/:id', findOne('expense'))
router.post('/', upsert('expense'))
router.delete('/:id', remove('expense'))
export default router
