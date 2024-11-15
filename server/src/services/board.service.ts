import { inject, injectable } from 'inversify'
import { DtoCreateBoard, DtoUpdateBoard } from '~/dtos/dtoBoard'
import { BoardRepository } from '~/repositories/board.repository'
import { DEFAULT_ITEM__PER_PAGE, DEFAULT_PAGE, NAME_SERVICE_INJECTION } from '~/utils/constant.util'
import { BadRequest, NotFoundError } from '~/utils/error-response.util'
import { pagingSkip, slugify } from '~/utils/formatter.util'
import { convertObjectId } from '~/utils/mongoose.util'
import { Pagination } from '~/utils/type.util'

const CONSTANT = {
  MSG_CREATE_BOARD_FAILED: 'Failed to create board',
  MSG_BOARD_NOT_FOUND: 'Board not found',
  MSG_UPDATE_BOARD_FAILED: 'Failed to update board',
  MSG_DELETE_BOARD_FAILED: 'Failed to delete board',
  MSG_PUSH_COLUMN_IDS_FAILED: 'Failed to push column order ids'
}

@injectable()
export class BoardService {
  constructor(@inject(NAME_SERVICE_INJECTION.BOARD_REPOSITORY) private readonly boardRepository: BoardRepository) {}

  async createBoard(userId: string, body: DtoCreateBoard) {
    const board = await this.boardRepository.create({
      ...body,
      slug: slugify(body.title),
      ownerIds: [convertObjectId(userId)]
    })
    if (!board) {
      throw new BadRequest(CONSTANT.MSG_CREATE_BOARD_FAILED)
    }

    return board
  }

  async getDetailBoard(userId: string, boardId: string) {
    return await this.boardRepository.getDetailsBoard(userId, boardId)
  }

  async updateBoardById(id: string, body: DtoUpdateBoard) {
    const board = await this.boardRepository.findById(id)
    if (!board) {
      throw new NotFoundError(CONSTANT.MSG_BOARD_NOT_FOUND)
    }

    const res = await this.boardRepository.findByIdAndUpdate(id, {
      $set: {
        ...body,
        slug: slugify(body?.title ? body.title : board.title),
        memberIds: body?.memberIds?.length > 0 ? body.memberIds.map((id) => convertObjectId(id)) : board.memberIds,
        ownerIds: body?.ownerIds?.length > 0 ? body.ownerIds.map((id) => convertObjectId(id)) : board.ownerIds,
        columnOrderIds:
          body?.columnOrderIds?.length > 0 ? body.columnOrderIds.map((id) => convertObjectId(id)) : board.columnOrderIds
      }
    })
    if (!res) {
      throw new BadRequest(CONSTANT.MSG_UPDATE_BOARD_FAILED)
    }

    return {
      _id: res
    }
  }

  async pushColumnIds(boardId: string, columnId: string) {
    const res = await this.boardRepository.findByIdAndUpdate(boardId, {
      $push: { columnOrderIds: convertObjectId(columnId), columns: convertObjectId(columnId) }
    })

    if (!res) {
      throw new BadRequest(CONSTANT.MSG_PUSH_COLUMN_IDS_FAILED)
    }

    return res
  }

  async findBoardById(boardId: string) {
    const board = await this.boardRepository.findById(boardId)
    if (!board || board._destroy) {
      throw new NotFoundError(CONSTANT.MSG_BOARD_NOT_FOUND)
    }
    return board
  }

  async deleteBoardById(boardId: string) {
    const board = await this.boardRepository.findById(boardId)
    if (!board) {
      throw new NotFoundError(CONSTANT.MSG_BOARD_NOT_FOUND)
    }

    const res = await this.boardRepository.findByIdAndUpdate(boardId, {
      $set: { _destroy: true }
    })
    if (!res) {
      throw new BadRequest(CONSTANT.MSG_DELETE_BOARD_FAILED)
    }

    return res._id
  }

  async getListBoard(userId: string, pagination?: Pagination) {
    const skip = pagingSkip(pagination?.page || DEFAULT_PAGE, pagination?.itemPerPage || DEFAULT_ITEM__PER_PAGE)
    const limit = pagination?.itemPerPage || DEFAULT_ITEM__PER_PAGE
    const data = await this.boardRepository.getListBoardByUserId(userId, skip, limit)

    return {
      boards: data[0].boards,
      total: data[0].total[0]?.total || 0
    }
  }

  async pullColumnIds(boardId: string, columnId: string) {
    const res = await this.boardRepository.findByIdAndUpdate(boardId, {
      $pull: { columnOrderIds: convertObjectId(columnId), columns: convertObjectId(columnId) }
    })

    if (!res) {
      throw new BadRequest(CONSTANT.MSG_PUSH_COLUMN_IDS_FAILED)
    }

    return res
  }
}
