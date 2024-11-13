import { inject, injectable } from 'inversify'
import { ObjectId } from 'mongodb'
import { DtoCreateColumn, DtoUpdateColumn } from '~/dtos/dtoColumn'
import { ColumnRepository } from '~/repositories/column.repository'
import { NAME_SERVICE_INJECTION } from '~/utils/constant.util'
import { BadRequest } from '~/utils/error-response.util'
import { convertObjectId } from '~/utils/mongoose.util'
import { BoardService } from './board.service'

const CONSTANT = {
  MSG_CREATE_COLUMN_FAILED: 'Failed to create Column',
  MSG_COLUMN_NOT_FOUND: 'Column not found',
  MSG_BOARD_NOT_FOUND: 'Board not found',
  MSG_COLUMN_PUSH_CARD_IDS_FAILED: 'Failed to push card ids',
  MSG_COLUMN_PULL_CARD_IDS_FAILED: 'Failed to pull card ids',
  MSG_COMLUMN_DELETE_FAILED: 'Failed to delete column',
  MSG_VALID_DELETE_COLUMN: 'Column has cards, please delete all cards before delete column'
}

@injectable()
export class ColumnService {
  constructor(
    @inject(NAME_SERVICE_INJECTION.COLUMN_REPOSITORY) private readonly columnRepository: ColumnRepository,
    @inject(BoardService) private readonly boardService: BoardService
  ) {}

  async createColumn(body: DtoCreateColumn) {
    const board = await this.boardService.findBoardById(body.boardId.toString())

    const column = await this.columnRepository.create({
      ...body,
      boardId: board._id
    })

    if (!column) {
      throw new BadRequest(CONSTANT.MSG_COLUMN_NOT_FOUND)
    }

    await this.boardService.pushColumnIds(body.boardId.toString(), column._id.toString())

    return column
  }

  async pushCardIds(columnId: string, cardId: string) {
    const res = await this.columnRepository.findByIdAndUpdate(columnId, {
      $push: { cardOrderIds: new ObjectId(cardId), cards: new ObjectId(cardId) }
    })

    if (!res) {
      throw new BadRequest(CONSTANT.MSG_COLUMN_PUSH_CARD_IDS_FAILED)
    }

    return res
  }

  async pullCardIds(columnId: string, cardId: string) {
    const res = await this.columnRepository.findByIdAndUpdate(columnId, {
      $pull: { cardOrderIds: new ObjectId(cardId), cards: new ObjectId(cardId) }
    })

    if (!res) {
      throw new BadRequest(CONSTANT.MSG_COLUMN_PULL_CARD_IDS_FAILED)
    }

    return res
  }

  async updateColumnById(columnId: string, body: DtoUpdateColumn) {
    const column = await this.findColumnById(columnId)

    const res = await this.columnRepository.findByIdAndUpdate(columnId, {
      $set: {
        ...body,
        cardOrderIds:
          body?.cardOrderIds?.length > 0 ? body?.cardOrderIds?.map((id) => convertObjectId(id)) : column.cardOrderIds,
        cards:
          body?.cardOrderIds?.length > 0 ? body?.cardOrderIds?.map((id) => convertObjectId(id)) : column.cardOrderIds
      }
    })

    if (!res) {
      throw new BadRequest(CONSTANT.MSG_CREATE_COLUMN_FAILED)
    }

    return {
      _id: res._id
    }
  }

  async findColumnById(columnId: string) {
    const column = await this.columnRepository.findById(columnId)
    if (!column || column._destroy) {
      throw new BadRequest(CONSTANT.MSG_COLUMN_NOT_FOUND)
    }
    return column
  }

  async deleteColumnById(columnId: string) {
    const column = await this.findColumnById(columnId)

    if (!column) {
      throw new BadRequest(CONSTANT.MSG_COLUMN_NOT_FOUND)
    }

    if (column.cardOrderIds.length > 0 || column.cards.length > 0) {
      throw new BadRequest(CONSTANT.MSG_VALID_DELETE_COLUMN)
    }

    await this.boardService.pullColumnIds(column.boardId.toString(), columnId)

    const res = await this.columnRepository.findByIdAndUpdate(columnId, {
      $set: {
        _destroy: true
      }
    })

    if (!res) {
      throw new BadRequest(CONSTANT.MSG_COMLUMN_DELETE_FAILED)
    }

    return {
      _id: columnId
    }
  }

  async moveCardBetweenColumns(body: {
    cardId: string
    columnId: string
    newColumnId: string
    cardOrderIds: string[]
  }) {
    const { cardId, columnId, newColumnId, cardOrderIds } = body
    await Promise.all([this.findColumnById(columnId), this.findColumnById(newColumnId)])
    const res = await this.columnRepository.findByIdAndUpdate(columnId, {
      $pull: { cardOrderIds: cardId, cards: cardId }
    })

    if (!res) {
      throw new BadRequest(CONSTANT.MSG_COLUMN_PULL_CARD_IDS_FAILED)
    }

    const resNewColumn = await this.columnRepository.findByIdAndUpdate(newColumnId, {
      $set: {
        cardOrderIds: cardOrderIds.map((id) => convertObjectId(id)),
        cards: cardOrderIds.map((id) => convertObjectId(id))
      }
    })

    if (!resNewColumn) {
      throw new BadRequest(CONSTANT.MSG_COLUMN_PUSH_CARD_IDS_FAILED)
    }

    return {
      _id: cardId
    }
  }
}
