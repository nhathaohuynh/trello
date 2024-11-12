import express from 'express'
import { container } from '~/config/inversify.config'
import { BoardController } from '../controllers/board.controller'
import { isAuthorized } from '../middlewares/authorized'
import { catchErrorHandler } from '../middlewares/catch-error-handler'
import { validationPipe } from '../middlewares/validationPipe'
import { ROUTE_APP } from './route-config-app'

const RouteBoard = express.Router()

const boardController = container.get<BoardController>(BoardController)

RouteBoard.route(ROUTE_APP.boards.child.getList.path)
  .get()
  .post(isAuthorized, validationPipe(), catchErrorHandler(boardController.createBoard.bind(boardController)))

RouteBoard.route(ROUTE_APP.boards.child.getById.path).get(
  isAuthorized,
  validationPipe({ routeParams: ['id'] }),
  catchErrorHandler(boardController.getDetailBoard.bind(boardController))
)

RouteBoard.route(ROUTE_APP.boards.child.update.path).put(
  isAuthorized,
  validationPipe({ routeParams: ['id'] }),
  catchErrorHandler(boardController.updateBoard.bind(boardController))
)

RouteBoard.route(ROUTE_APP.boards.child.delete.path).delete(
  isAuthorized,
  validationPipe({ routeParams: ['id'] }),
  catchErrorHandler(boardController.deleteBoard.bind(boardController))
)

export { RouteBoard }
