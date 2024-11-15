import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import env from '~/config/env.config'
import { BoardService } from '~/services/board.service'
import uploadImageService from '~/services/upload-image.service'
import { CreatedResponse, OKResponse } from '~/utils/success-response.util'

const CONSTANT = {
  MSG_CREATE_BOARD_SUCCESS: 'Board created successfully'
}

@injectable()
export class BoardController {
  constructor(@inject(BoardService) private boardService: BoardService) {}

  async createBoard(req: Request, res: Response) {
    if (req.file) {
      const cover = await uploadImageService.streamUpload(req.file.buffer, env.CLOUDINARY_FOLDER)
      const data = await this.boardService.createBoard(req.userId, { ...req.body, cover: cover.secure_url })
      return new CreatedResponse(data, CONSTANT.MSG_CREATE_BOARD_SUCCESS).send(req, res)
    }

    const data = await this.boardService.createBoard(req.userId, req.body)
    return new CreatedResponse(data, CONSTANT.MSG_CREATE_BOARD_SUCCESS).send(req, res)
  }

  async getListBoard(req: Request, res: Response) {
    const { page, itemPerPage } = req.query
    const data = await this.boardService.getListBoard(req.userId, {
      page: parseInt(page as string, 10),
      itemPerPage: parseInt(itemPerPage as string, 10)
    })
    return new OKResponse(data).send(req, res)
  }

  async getDetailBoard(req: Request, res: Response) {
    const boardId = req.params.id
    const data = await this.boardService.getDetailBoard(req.userId, boardId)
    return new OKResponse(data).send(req, res)
  }

  async updateBoard(req: Request, res: Response) {
    const boardId = req.params.id
    const data = await this.boardService.updateBoardById(boardId, req.body)
    return new OKResponse(data._id).send(req, res)
  }

  async deleteBoard(req: Request, res: Response) {
    const boardId = req.params.id
    const data = await this.boardService.deleteBoardById(boardId)
    return new OKResponse(data).send(req, res)
  }
}
