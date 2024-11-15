import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { InvitationService } from '~/services/invitation.service'
import { CreatedResponse } from '~/utils/success-response.util'

const CONSTANT = {
  MSG_CREATE_SUCCESS: 'Already create invitation'
}

@injectable()
export class InvitationController {
  constructor(@inject(InvitationService) private invitationService: InvitationService) {}

  async createInvitation(req: Request, res: Response) {
    const data = await this.invitationService.createInvitation(req.userId, req.body)
    return new CreatedResponse(data, CONSTANT.MSG_CREATE_SUCCESS).send(res)
  }

  // async updateComment(req: Request, res: Response) {
  //   const data = await this.commentSerivce.updateCommentById(req.params.id, req.body)
  //   return new OKResponse(data).send(res)
  // }

  // async deleteComment(req: Request, res: Response) {
  //   const data = await this.commentSerivce.deleteCommentById(req.params.id)
  //   return new OKResponse(data).send(res)
  // }

  // async getListCommentByCardId(req: Request, res: Response) {
  //   const data = await this.commentSerivce.getListCommentByCardId(req.params.cardId)
  //   return new OKResponse(data).send(res)
  // }
}
