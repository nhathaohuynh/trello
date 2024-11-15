import express from 'express'
import { loggerRequest } from '../middlewares/logger'
import { RouteBoard } from './board.route'
import { RouteCard } from './card.route'
import { RouteColumn } from './column.route'
import { RouteComment } from './comment.route'
import { RouteInvitation } from './invitation.route'
import { ROUTE_APP } from './route-config-app'
import { RouteUser } from './user.route'
const router = express.Router()

router.use(loggerRequest)

// Board API
router.use(ROUTE_APP.boards.path, RouteBoard)

// column API

router.use(ROUTE_APP.Columns.path, RouteColumn)

// card API

router.use(ROUTE_APP.cards.path, RouteCard)

// user API

router.use(ROUTE_APP.users.path, RouteUser)

// comment API

router.use(ROUTE_APP.comments.path, RouteComment)

// Invitation API

router.use(ROUTE_APP.invitations.path, RouteInvitation)

export default router
