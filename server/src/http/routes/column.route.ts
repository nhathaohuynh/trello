import express from 'express'
import { container } from '~/config/inversify.config'
import { isAuthorized } from '../middlewares/authorized'
import { catchErrorHandler } from '../middlewares/catch-error-handler'
import { validationPipe } from '../middlewares/validationPipe'
import { ColumnController } from './../controllers/column.controller'
import { ROUTE_APP } from './route-config-app'

const RouteColumn = express.Router()

const columnController = container.get<ColumnController>(ColumnController)

RouteColumn.route(ROUTE_APP.Columns.child.getList.path).post(
  isAuthorized,
  validationPipe(),
  catchErrorHandler(columnController.createColumn.bind(columnController))
)

RouteColumn.route(ROUTE_APP.Columns.child.moveCardBetweenColumns.path).put(
  isAuthorized,
  catchErrorHandler(columnController.moveCardBetweenColumns.bind(columnController))
)

RouteColumn.route(ROUTE_APP.Columns.child.update.path).put(
  isAuthorized,
  validationPipe({ routeParams: ['id'] }),
  catchErrorHandler(columnController.updateColumn.bind(columnController))
)

RouteColumn.route(ROUTE_APP.Columns.child.delete.path).delete(
  isAuthorized,
  validationPipe({ routeParams: ['id'] }),
  catchErrorHandler(columnController.deleteColumn.bind(columnController))
)

export { RouteColumn }
