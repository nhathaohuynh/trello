import { injectable } from 'inversify'
import CardModel, { ICard } from '~/databases/models/card.model'
import { BaseRepository } from './repository.abstract'

@injectable()
export class CardRepository extends BaseRepository<ICard> {
  constructor() {
    super(CardModel)
  }
}
