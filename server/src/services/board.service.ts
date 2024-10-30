import { inject, injectable } from 'inversify'
import { IBoard } from '~/databases/models/board.model'
import { ICard } from '~/databases/models/card.model'
import { IColumn } from '~/databases/models/column.model'
import { BoardRepository } from '~/repositories/board.repository'
import { BadRequest, NotFoundError } from '~/utils/error-response.util'
import { slugify } from '~/utils/formatter.util'

const CONSTANT = {
  MSG_CREATE_BOARD_FAILED: 'Failed to create board',
  MSG_BOARD_NOT_FOUND: 'Board not found',
  MSG_UPDATE_BOARD_FAILED: 'Failed to update board'
}

@injectable()
export class BoardService {
  constructor(@inject('BoardRepository') private readonly boardRepository: BoardRepository) {}

  async createBoard(body: IBoard) {
    const idBoard = await this.boardRepository.create({ ...body, slug: slugify(body.title) })
    if (!idBoard) {
      throw new BadRequest(CONSTANT.MSG_CREATE_BOARD_FAILED)
    }

    return await this.boardRepository.findById(idBoard)
  }

  async getDetailBoard(id: string) {
    const boardDetail = await this.boardRepository.findByIdAndLookup(id)

    if (!boardDetail) {
      throw new NotFoundError(CONSTANT.MSG_BOARD_NOT_FOUND)
    }

    // Deep clone boardDetail to prevent mutation
    const resBoard: IBoard & { columns: (IColumn & { cards: ICard[] })[] } = JSON.parse(JSON.stringify(boardDetail))

    // Map cards to columns
    resBoard.columns = resBoard.columns.map((column: IColumn & { cards: ICard[] }) => {
      column.cards = resBoard.cards.filter((card: ICard) => card.columnId === column._id)
      return column
    })

    return resBoard
  }

  async updateBoardById(id: string, body: Partial<IBoard>) {
    const board = await this.boardRepository.findById(id)
    if (!board) {
      throw new NotFoundError(CONSTANT.MSG_BOARD_NOT_FOUND)
    }

    const res = await this.boardRepository.findByIdAndUpdate(
      id,
      {
        $set: {
          ...body,
          updatedAt: Date.now()
        }
      },
      { returnDocument: 'after' }
    )

    if (!res) {
      throw new BadRequest(CONSTANT.MSG_UPDATE_BOARD_FAILED)
    }

    return res
  }

  async pushColumnIds(boardId: string, columnId: string) {
    const res = await this.boardRepository.findByIdAndUpdate(
      boardId,
      { $push: { columnOrderIds: columnId } },
      { returnDocument: 'after' }
    )

    if (!res) {
      throw new BadRequest('Failed to push column order ids')
    }

    return res
  }

  async findBoardById(boardId: string) {
    const board = await this.boardRepository.findById(boardId)
    if (!board) {
      throw new NotFoundError(CONSTANT.MSG_BOARD_NOT_FOUND)
    }
    return board
  }

  async deleteBoardById(boardId: string) {
    const board = await this.boardRepository.findById(boardId)
    if (!board) {
      throw new NotFoundError(CONSTANT.MSG_BOARD_NOT_FOUND)
    }

    const res = await this.boardRepository.findByIdAndUpdate(
      boardId,
      {
        $set: { _destroy: true }
      },
      { returnDocument: 'after' }
    )

    if (!res) {
      throw new BadRequest('Failed to delete board')
    }

    return res._id
  }
}
