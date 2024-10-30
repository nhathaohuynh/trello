import express, { Request, Response } from 'express'
import { container } from '~/config/inversify.config'
import { CardController } from '../controllers/card.controller'
import { catchErrorHandler } from '../middlewares/catch-error-handler'
import { validationPipe } from '../middlewares/validationPipe'
import { ROUTE_APP } from './route-config-app'

const RouteCard = express.Router()

const cardController = container.get<CardController>(CardController)

RouteCard.route(ROUTE_APP.cards.child.getList.path)
  .get(
    catchErrorHandler(async (req: Request, res: Response) => {
      res.status(200).json({ message: 'Hello World' })
    })
  )
  .post(validationPipe, catchErrorHandler(cardController.createCard.bind(cardController)))

RouteCard.route(ROUTE_APP.cards.child.getById.path).get().put().delete()
export { RouteCard }
