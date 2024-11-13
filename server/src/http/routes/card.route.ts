import express from 'express'
import { container } from '~/config/inversify.config'
import { CardController } from '../controllers/card.controller'
import { isAuthorized } from '../middlewares/authorized'
import { catchErrorHandler } from '../middlewares/catch-error-handler'
import { upload } from '../middlewares/multer-upload'
import { validationPipe } from '../middlewares/validationPipe'
import { ROUTE_APP } from './route-config-app'

const RouteCard = express.Router()

const cardController = container.get<CardController>(CardController)

RouteCard.route(ROUTE_APP.cards.child.create.path).post(
  isAuthorized,
  upload.single('cover'),
  validationPipe(),
  catchErrorHandler(cardController.createCard.bind(cardController))
)

RouteCard.route(ROUTE_APP.cards.child.delete.path).delete(
  isAuthorized,
  validationPipe({ routeParams: ['id'] }),
  catchErrorHandler(cardController.deleteCard.bind(cardController))
)

RouteCard.route(ROUTE_APP.cards.child.update.path).put(
  isAuthorized,
  upload.single('cover'),
  validationPipe({ routeParams: ['id'] }),
  catchErrorHandler(cardController.updateCard.bind(cardController))
)
export { RouteCard }
