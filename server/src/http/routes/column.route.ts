import express from 'express'
import { container } from '~/config/inversify.config'
import { catchErrorHandler } from '../middlewares/catch-error-handler'
import { validationPipe } from '../middlewares/validationPipe'
import { ColumnController } from './../controllers/column.controller'
import { ROUTE_APP } from './route-config-app'

const RouteColumn = express.Router()

const columnController = container.get<ColumnController>(ColumnController)

RouteColumn.route(ROUTE_APP.Columns.child.getList.path)
  .get()
  .post(validationPipe, catchErrorHandler(columnController.createColumn.bind(columnController)))

RouteColumn.route(ROUTE_APP.Columns.child.moveCardBetweenColumns.path).put(
  catchErrorHandler(columnController.moveCardBetweenColumns.bind(columnController))
)
RouteColumn.route(ROUTE_APP.Columns.child.getById.path)
  .get()
  .put(validationPipe, catchErrorHandler(columnController.updateColumn.bind(columnController)))
  .delete(catchErrorHandler(columnController.deleteColumn.bind(columnController)))

export { RouteColumn }
