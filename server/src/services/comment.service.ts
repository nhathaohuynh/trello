import { inject, injectable } from 'inversify'
import { DtoCreateComment } from '~/dtos/dtoComment'
import { CommentRepository } from '~/repositories/comment.repository'
import { NAME_SERVICE_INJECTION } from '~/utils/constant.util'
import { CardService } from './card.service'

@injectable()
export class CommentService {
  constructor(
    @inject(NAME_SERVICE_INJECTION.COMMENT_REPOSITORY) private commentRepository: CommentRepository,
    @inject(CardService) private cardService: CardService
  ) {}

  async createComment(body: DtoCreateComment) {
    const card = await this.cardService.findCardById(body.cardId.toString())
    const comment = await (await this.commentRepository.create(body)).populate('user', '-password -verifyToken')

    card.comments.push(comment._id)
    card.save()

    return comment
  }

  getListCommentByCardId(cardId: string) {
    return this.commentRepository.find({ cardId })
  }

  deleteCommentById(commentId: string) {
    return this.commentRepository.findByIdAndDelete(commentId)
  }

  updateCommentById(commentId: string, body: DtoCreateComment) {
    return this.commentRepository.findByIdAndUpdate(commentId, {
      $set: {
        ...body
      }
    })
  }

  async deleteCommentByCardId(cardId: string) {
    return this.commentRepository.deleteByCardId(cardId)
  }
}
