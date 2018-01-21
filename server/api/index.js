import { Router } from 'express'

import users from './users'
import dogs from './dogs'
import labels from './labels'

const router = Router()

// Add USERS Routes
router.use(users)
router.use(dogs)
router.use(labels)

export default router
