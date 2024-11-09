import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { CardService } from '~/services/card.service'
import { CreatedResponse } from '~/utils/success-response.util'

const CONSTANT = {
  MSG_CREATE_COLUMN_SUCCESS: 'Column created successfully'
}

@injectable()
export class CardController {
  constructor(@inject(CardService) private cardService: CardService) {}

  async createCard(req: Request, res: Response) {
    const data = await this.cardService.createCard(req.body)
    return new CreatedResponse(data, CONSTANT.MSG_CREATE_COLUMN_SUCCESS).send(res)
  }

  async deleteCard(req: Request, res: Response) {
    const data = await this.cardService.deleteCard(req.params.id)
    return new CreatedResponse(data).send(res)
  }

  async updateCard(req: Request, res: Response) {
    const data = await this.cardService.updateCard(req.params.id, req.body)
    return new CreatedResponse(data).send(res)
  }
}
