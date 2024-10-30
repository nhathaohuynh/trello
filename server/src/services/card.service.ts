import { inject, injectable } from 'inversify'
import { ICard } from '~/databases/models/card.model'
import { CardRepository } from '~/repositories/card.repository'
import { BadRequest } from '~/utils/error-response.util'
import { ColumnService } from './column.service'

const CONSTANT = {
  MSG_CREATE_CARD_FAILED: 'Failed to create card',
  MSG_COLUMN_NOT_FOUND: 'column not found',
  MSG_CARD_NOT_FOUND: 'card not found',
  MGS_CARD_DELETE_FAILED: 'Failed to delete card'
}

@injectable()
export class CardService {
  constructor(
    @inject('CardRepository') private readonly cardRepository: CardRepository,
    @inject(ColumnService) private readonly columnService: ColumnService
  ) {}

  async createCard(body: ICard) {
    const column = await this.columnService.findColumnById(body.columnId.toString())

    if (!column) {
      throw new BadRequest(CONSTANT.MSG_COLUMN_NOT_FOUND)
    }

    const idCard = await this.cardRepository.create(body)
    if (!idCard) {
      throw new BadRequest(CONSTANT.MSG_CREATE_CARD_FAILED)
    }

    const card = await this.cardRepository.findById(idCard)

    if (!card) {
      throw new BadRequest(CONSTANT.MSG_CARD_NOT_FOUND)
    }

    await this.columnService.pushColumnIds(body.columnId.toString(), idCard.toString())

    return card
  }

  async deleteCard(cardId: string) {
    const card = await this.cardRepository.findById(cardId)

    if (!card) {
      throw new BadRequest(CONSTANT.MSG_CARD_NOT_FOUND)
    }

    const res = await this.cardRepository.findByIdAndUpdate(
      cardId,
      { $set: { _destroy: true } },
      { returnDocument: 'after' }
    )

    if (!res) {
      throw new BadRequest(CONSTANT.MGS_CARD_DELETE_FAILED)
    }

    return card
  }
}
