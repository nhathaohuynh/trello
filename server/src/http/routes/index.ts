import express from 'express'
import { RouteBoard } from './board.route'
import { RouteCard } from './card.route'
import { RouteColumn } from './column.route'
import { ROUTE_APP } from './route-config-app'

const router = express.Router()

// Board API
router.use(ROUTE_APP.boards.path, RouteBoard)

// column API

router.use(ROUTE_APP.Columns.path, RouteColumn)

// card API

router.use(ROUTE_APP.cards.path, RouteCard)

export default router
