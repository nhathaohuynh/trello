import express, { Request, Response } from 'express'
import { container } from '~/config/inversify.config'
import { BoardController } from '../controllers/board.controller'
import { catchErrorHandler } from '../middlewares/catch-error-handler'
import { validationPipe } from '../middlewares/validationPipe'
import { ROUTE_APP } from './route-config-app'

const RouteBoard = express.Router()

const boardController = container.get<BoardController>(BoardController)

RouteBoard.route(ROUTE_APP.boards.child.getList.path)
  .get(
    catchErrorHandler(async (req: Request, res: Response) => {
      res.status(200).json({ message: 'Hello World' })
    })
  )
  .post(validationPipe, catchErrorHandler(boardController.createBoard.bind(boardController)))

RouteBoard.route(ROUTE_APP.boards.child.getById.path)
  .get(catchErrorHandler(boardController.getDetailBoard.bind(boardController)))
  .put(validationPipe, catchErrorHandler(boardController.updateBoard.bind(boardController)))
  .delete()
export { RouteBoard }
