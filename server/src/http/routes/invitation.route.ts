import express from 'express'
import { container } from '~/config/inversify.config'
import { InvitationController } from '../controllers/invatation.controller'
import { isAuthorized } from '../middlewares/authorized'
import { catchErrorHandler } from '../middlewares/catch-error-handler'
import { validationPipe } from '../middlewares/validationPipe'
import { ROUTE_APP } from './route-config-app'

const RouteInvitation = express.Router()

const invitationController = container.get<InvitationController>(InvitationController)

RouteInvitation.route(ROUTE_APP.invitations.child.create.path).post(
  isAuthorized,
  validationPipe(),
  catchErrorHandler(invitationController.createInvitation.bind(invitationController))
)

// RouteInvitation.route(ROUTE_APP.invitations.child.getList.path).get(
//   isAuthorized,
//   validationPipe({ routeParams: ['id'] }),
//   catchErrorHandler(invitationController.getListCommentByCardId.bind(invitationController))
// )

// RouteInvitation.route(ROUTE_APP.invitations.child.delete.path).delete(
//   isAuthorized,
//   validationPipe({ routeParams: ['id'] }),
//   catchErrorHandler(invitationController.deleteComment.bind(invitationController))
// )

// RouteInvitation.route(ROUTE_APP.invitations.child.update.path).put(
//   isAuthorized,
//   validationPipe({ routeParams: ['id'] }),
//   catchErrorHandler(invitationController.updateComment.bind(invitationController))
// )
export { RouteInvitation }
