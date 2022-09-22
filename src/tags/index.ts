import express from 'express'
import { service } from '../serviceBuilder'

const router = express.Router()
const tagService = service('tag')

router.get('/', tagService.find())
router.get('/:id', tagService.findOne())
router.post('/', tagService.upsert())
router.delete('/:id', tagService.remove())
export default router
