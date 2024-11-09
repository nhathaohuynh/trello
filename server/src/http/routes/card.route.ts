import express from 'express'
import { container } from '~/config/inversify.config'
import { CardController } from '../controllers/card.controller'
import { catchErrorHandler } from '../middlewares/catch-error-handler'
import { validationPipe } from '../middlewares/validationPipe'
import { ROUTE_APP } from './route-config-app'

const RouteCard = express.Router()

const cardController = container.get<CardController>(CardController)

RouteCard.route(ROUTE_APP.cards.child.getList.path)
  .get()
  .post(validationPipe, catchErrorHandler(cardController.createCard.bind(cardController)))

RouteCard.route(ROUTE_APP.cards.child.getById.path)
  .get()
  .put(catchErrorHandler(cardController.updateCard.bind(cardController)))
  .delete(catchErrorHandler(cardController.deleteCard.bind(cardController)))
export { RouteCard }
