import express from 'express'
import { container } from '~/config/inversify.config'
import { CommentController } from '../controllers/comment.controller'
import { isAuthorized } from '../middlewares/authorized'
import { catchErrorHandler } from '../middlewares/catch-error-handler'
import { validationPipe } from '../middlewares/validationPipe'
import { ROUTE_APP } from './route-config-app'

const RouteComment = express.Router()

const commentController = container.get<CommentController>(CommentController)

RouteComment.route(ROUTE_APP.comments.child.create.path).post(
  isAuthorized,
  validationPipe(),
  catchErrorHandler(commentController.createComment.bind(commentController))
)

RouteComment.route(ROUTE_APP.comments.child.getList.path).get(
  isAuthorized,
  validationPipe({ routeParams: ['id'] }),
  catchErrorHandler(commentController.getListCommentByCardId.bind(commentController))
)

RouteComment.route(ROUTE_APP.comments.child.delete.path).delete(
  isAuthorized,
  validationPipe({ routeParams: ['id'] }),
  catchErrorHandler(commentController.deleteComment.bind(commentController))
)

RouteComment.route(ROUTE_APP.comments.child.update.path).put(
  isAuthorized,
  validationPipe({ routeParams: ['id'] }),
  catchErrorHandler(commentController.updateComment.bind(commentController))
)
export { RouteComment }
