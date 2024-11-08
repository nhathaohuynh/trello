import { inject, injectable } from 'inversify'
import { ICard } from '~/databases/models/card.model'
import { IColumn } from '~/databases/models/column.model'
import { ColumnRepository } from '~/repositories/column.repository'
import { BadRequest } from '~/utils/error-response.util'
import { BoardService } from './board.service'

const CONSTANT = {
  MSG_CREATE_COLUMN_FAILED: 'Failed to create Column',
  MSG_COLUMN_NOT_FOUND: 'Column not found',
  MSG_BOARD_NOT_FOUND: 'Board not found'
}

@injectable()
export class ColumnService {
  constructor(
    @inject('ColumnRepository') private readonly columnRepository: ColumnRepository,
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
      columnId,
      { $push: { cardOrderIds: cardId } },
      { returnDocument: 'after' }
    )

    if (!res) {
      throw new BadRequest('Failed to push cards ids')
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
}
