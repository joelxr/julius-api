import express from 'express'
import find from './find'
import findOne from './findOne'
import { upsert, remove } from '../_base-service'

const router = express.Router()

router.get('/', find())
router.get('/:id', findOne())
router.post('/', upsert('tag'))
router.delete('/:id', remove('tag'))

export default router
