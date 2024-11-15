import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { CommentService } from '~/services/comment.service'
import { CreatedResponse, OKResponse } from '~/utils/success-response.util'

const CONSTANT = {
  MSG_CREATE_SUCCESS: 'Comment created successfully'
}

@injectable()
export class CommentController {
  constructor(@inject(CommentService) private commentSerivce: CommentService) {}

  async createComment(req: Request, res: Response) {
    const data = await this.commentSerivce.createComment(req.body)
    return new CreatedResponse(data, CONSTANT.MSG_CREATE_SUCCESS).send(res)
  }

  async updateComment(req: Request, res: Response) {
    const data = await this.commentSerivce.updateCommentById(req.params.id, req.body)
    return new OKResponse(data).send(res)
  }

  async deleteComment(req: Request, res: Response) {
    const data = await this.commentSerivce.deleteCommentById(req.params.id)
    return new OKResponse(data).send(res)
  }

  async getListCommentByCardId(req: Request, res: Response) {
    const data = await this.commentSerivce.getListCommentByCardId(req.params.cardId)
    return new OKResponse(data).send(res)
  }
}
