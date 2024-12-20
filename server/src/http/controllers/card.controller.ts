import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import env from '~/config/env.config'
import { CardService } from '~/services/card.service'
import uploadImageService from '~/services/upload-image.service'
import { CreatedResponse } from '~/utils/success-response.util'

const CONSTANT = {
  MSG_CREATE_COLUMN_SUCCESS: 'Column created successfully'
}

@injectable()
export class CardController {
  constructor(@inject(CardService) private cardService: CardService) {}

  async createCard(req: Request, res: Response) {
    if (req.file) {
      const cover = await uploadImageService.streamUpload(req.file.buffer, env.CLOUDINARY_FOLDER)
      const data = await this.cardService.createCard({ ...req.body, cover: cover.secure_url })
      return new CreatedResponse(data, CONSTANT.MSG_CREATE_COLUMN_SUCCESS).send(req, res)
    }
    const data = await this.cardService.createCard(req.body)
    return new CreatedResponse(data, CONSTANT.MSG_CREATE_COLUMN_SUCCESS).send(req, res)
  }

  async deleteCard(req: Request, res: Response) {
    const data = await this.cardService.deleteCard(req.params.id)
    return new CreatedResponse(data).send(req, res)
  }

  async updateCard(req: Request, res: Response) {
    if (req.file) {
      const cover = await uploadImageService.streamUpload(req.file.buffer, env.CLOUDINARY_FOLDER)
      const data = await this.cardService.updateCard(req.params.id, { ...req.body, cover: cover.secure_url })
      return new CreatedResponse(data).send(req, res)
    }

    const data = await this.cardService.updateCard(req.params.id, req.body)
    return new CreatedResponse(data).send(req, res)
  }
}
