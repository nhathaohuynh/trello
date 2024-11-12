import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { BoardService } from '~/services/board.service'
import { CreatedResponse, OKResponse } from '~/utils/success-response.util'

const CONSTANT = {
  MSG_CREATE_BOARD_SUCCESS: 'Board created successfully'
}

@injectable()
export class BoardController {
  constructor(@inject(BoardService) private boardService: BoardService) {}

  async createBoard(req: Request, res: Response) {
    const data = await this.boardService.createBoard(req.body)
    return new CreatedResponse(data, CONSTANT.MSG_CREATE_BOARD_SUCCESS).send(res)
  }

  async getDetailBoard(req: Request, res: Response) {
    const boardId = req.params.id
    const data = await this.boardService.getDetailBoard(boardId)
    return new OKResponse(data).send(res)
  }

  async updateBoard(req: Request, res: Response) {
    const boardId = req.params.id
    const data = await this.boardService.updateBoardById(boardId, req.body)
    return new OKResponse(data._id).send(res)
  }

  async deleteBoard(req: Request, res: Response) {
    const boardId = req.params.id
    const data = await this.boardService.deleteBoardById(boardId)
    return new OKResponse(data).send(res)
  }
}
