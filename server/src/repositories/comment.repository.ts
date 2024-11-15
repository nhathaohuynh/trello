import { injectable } from 'inversify'
import { QueryOptions } from 'mongoose'
import { CommentModel, IComment } from '~/databases/models/comment'
import { BaseRepository } from './repository.abstract'

@injectable()
export class CommentRepository extends BaseRepository<IComment> {
  constructor() {
    super(CommentModel)
  }

  find(query: QueryOptions<IComment>) {
    return this.model.find(query).populate('user').select('-password -verifyToken').exec()
  }

  deleteByCardId(cardId: string) {
    return this.model.deleteMany({
      cardId: cardId
    })
  }
}
