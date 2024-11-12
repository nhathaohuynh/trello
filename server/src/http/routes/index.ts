import express from 'express'
import { RouteBoard } from './board.route'
import { RouteCard } from './card.route'
import { RouteColumn } from './column.route'
import { ROUTE_APP } from './route-config-app'
import { RouteUser } from './user.route'

const router = express.Router()

// Board API
router.use(ROUTE_APP.boards.path, RouteBoard)

// column API

router.use(ROUTE_APP.Columns.path, RouteColumn)

// card API

router.use(ROUTE_APP.cards.path, RouteCard)

// user API

router.use(ROUTE_APP.users.path, RouteUser)

export default router
