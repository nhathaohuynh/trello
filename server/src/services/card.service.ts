import { inject, injectable } from 'inversify'
import { DtoCreateCard, DtoUpdateCard } from '~/dtos/dtoCard'
import { CardRepository } from '~/repositories/card.repository'
import { NAME_SERVICE_INJECTION } from '~/utils/constant.util'
import { BadRequest } from '~/utils/error-response.util'
import { convertObjectId } from '~/utils/mongoose.util'
import { ColumnService } from './column.service'

const CONSTANT = {
  MSG_CREATE_CARD_FAILED: 'Failed to create card',
  MSG_CARD_NOT_FOUND: 'card not found',
  MGS_CARD_DELETE_FAILED: 'Failed to delete card',
  MSG_CREATE_UPDATE_FAILED: 'Failed to update card'
}

@injectable()
export class CardService {
  constructor(
    @inject(NAME_SERVICE_INJECTION.CARD_REPOSITORY) private readonly cardRepository: CardRepository,
    @inject(ColumnService) private readonly columnService: ColumnService
  ) {}

  async createCard(body: DtoCreateCard) {
    const column = await this.columnService.findColumnById(body.columnId)

    const card = await this.cardRepository.create({
      ...body,
      columnId: convertObjectId(body.columnId),
      boardId: column.boardId
    })
    if (!card) {
      throw new BadRequest(CONSTANT.MSG_CREATE_CARD_FAILED)
    }

    if (!card) {
      throw new BadRequest(CONSTANT.MSG_CARD_NOT_FOUND)
    }

    await this.columnService.pushCardIds(body.columnId, card._id.toString())

    return card
  }

  async updateCard(cardId: string, body: DtoUpdateCard) {
    const card = await this.cardRepository.findById(cardId)

    if (!card) {
      throw new BadRequest(CONSTANT.MSG_CARD_NOT_FOUND)
    }

    const res = await this.cardRepository.findByIdAndUpdate(cardId, { $set: { ...body } })

    if (!res) {
      throw new BadRequest(CONSTANT.MSG_CREATE_UPDATE_FAILED)
    }

    return res
  }

  async deleteCard(cardId: string) {
    const card = await this.cardRepository.findById(cardId)

    if (!card) {
      throw new BadRequest(CONSTANT.MSG_CARD_NOT_FOUND)
    }

    await this.columnService.pullCardIds(card.columnId.toString(), cardId)

    const res = await this.cardRepository.findByIdAndUpdate(cardId, { $set: { _destroy: true } })

    if (!res) {
      throw new BadRequest(CONSTANT.MGS_CARD_DELETE_FAILED)
    }

    return {
      _id: cardId
    }
  }

  async findCardById(cardId: string) {
    const card = await this.cardRepository.findById(cardId)

    if (!card || card._destroy) {
      throw new BadRequest(CONSTANT.MSG_CARD_NOT_FOUND)
    }

    return card
  }
}
