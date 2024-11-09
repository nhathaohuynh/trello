import { inject, injectable } from 'inversify'
import { ObjectId } from 'mongodb'
import { ICard } from '~/databases/models/card.model'
import { IColumn } from '~/databases/models/column.model'
import { ColumnRepository } from '~/repositories/column.repository'
import { NAME_SERVICE_INJECTION } from '~/utils/constant.util'
import { BadRequest } from '~/utils/error-response.util'
import { BoardService } from './board.service'

const CONSTANT = {
  MSG_CREATE_COLUMN_FAILED: 'Failed to create Column',
  MSG_COLUMN_NOT_FOUND: 'Column not found',
  MSG_BOARD_NOT_FOUND: 'Board not found',
  MSG_COLUMN_PUSH_CARD_IDS_FAILED: 'Failed to push card ids',
  MSG_COLUMN_PULL_CARD_IDS_FAILED: 'Failed to pull card ids'
}

@injectable()
export class ColumnService {
  constructor(
    @inject(NAME_SERVICE_INJECTION.COLUMN_REPOSITORY) private readonly columnRepository: ColumnRepository,
    @inject(BoardService) private readonly boardService: BoardService
  ) {}

  async createColumn(body: IColumn) {
    const board = await this.boardService.findBoardById(body.boardId.toString())

    if (!board) {
      throw new BadRequest(CONSTANT.MSG_BOARD_NOT_FOUND)
    }

    const idCOlumn = await this.columnRepository.create(body)
    if (!idCOlumn) {
      throw new BadRequest(CONSTANT.MSG_CREATE_COLUMN_FAILED)
    }

    const column = await this.columnRepository.findById(idCOlumn)

    if (!column) {
      throw new BadRequest(CONSTANT.MSG_COLUMN_NOT_FOUND)
    }

    const resColumn: IColumn & { cards: ICard[] } = JSON.parse(JSON.stringify(column))

    resColumn.cards = []

    await this.boardService.pushColumnIds(body.boardId.toString(), idCOlumn.toString())

    return resColumn
  }

  async pushColumnIds(columnId: string, cardId: string) {
    const res = await this.columnRepository.findByIdAndUpdate(
      new ObjectId(columnId),
      { $push: { cardOrderIds: new ObjectId(cardId) } },
      { returnDocument: 'after' }
    )

    if (!res) {
      throw new BadRequest(CONSTANT.MSG_COLUMN_PUSH_CARD_IDS_FAILED)
    }

    return res
  }

  async updateColumnById(columnId: string, body: Partial<IColumn>) {
    const column = await this.findColumnById(columnId)

    if (!column) {
      throw new BadRequest(CONSTANT.MSG_COLUMN_NOT_FOUND)
    }

    const res = await this.columnRepository.findByIdAndUpdate(
      columnId,
      {
        $set: {
          ...body,
          updatedAt: Date.now()
        }
      },
      { returnDocument: 'after' }
    )

    return res._id
  }

  async findColumnById(columnId: string) {
    const column = await this.columnRepository.findById(columnId)
    if (!column) {
      throw new BadRequest(CONSTANT.MSG_COLUMN_NOT_FOUND)
    }

    return column
  }

  async deleteColumnById(columnId: string) {
    const column = await this.findColumnById(columnId)

    if (!column) {
      throw new BadRequest(CONSTANT.MSG_COLUMN_NOT_FOUND)
    }

    const res = await this.columnRepository.findByIdAndUpdate(
      columnId,
      {
        $set: {
          _destroy: true
        }
      },
      { returnDocument: 'after' }
    )

    return res._id
  }

  async moveCardBetweenColumns(body: {
    cardId: string
    columnId: string
    newColumnId: string
    cardOrderIds: string[]
  }) {
    const { cardId, columnId, newColumnId, cardOrderIds } = body

    const column = await this.findColumnById(columnId)
    const newColumn = await this.findColumnById(newColumnId)

    if (!column || !newColumn) {
      throw new BadRequest(CONSTANT.MSG_COLUMN_NOT_FOUND)
    }

    const res = await this.columnRepository.findByIdAndUpdate(
      columnId,
      {
        $pull: { cardOrderIds: cardId }
      },
      { returnDocument: 'after' }
    )

    if (!res) {
      throw new BadRequest(CONSTANT.MSG_COLUMN_PULL_CARD_IDS_FAILED)
    }

    const resNewColumn = await this.columnRepository.findByIdAndUpdate(
      newColumnId,
      {
        $set: { cardOrderIds: cardOrderIds }
      },
      { returnDocument: 'after' }
    )

    if (!resNewColumn) {
      throw new BadRequest(CONSTANT.MSG_COLUMN_PUSH_CARD_IDS_FAILED)
    }

    return resNewColumn._id
  }
}
