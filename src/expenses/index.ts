import express from 'express'
import find from './find'
import findOne from './findOne'
import { upsert, remove } from '../_base-service'

const router = express.Router()

router.get('/', find())
router.get('/:id', findOne())
router.post('/', upsert('expense'))
router.delete('/:id', remove('expense'))
export default router
