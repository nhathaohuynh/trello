import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { ColumnService } from '~/services/column.service'
import { CreatedResponse, OKResponse } from '~/utils/success-response.util'

const CONSTANT = {
  MSG_CREATE_COLUMN_SUCCESS: 'Column created successfully'
}

@injectable()
export class ColumnController {
  constructor(@inject(ColumnService) private columnService: ColumnService) {}

  async createColumn(req: Request, res: Response) {
    const data = await this.columnService.createColumn(req.body)
    return new CreatedResponse(data, CONSTANT.MSG_CREATE_COLUMN_SUCCESS).send(res)
  }

  async updateColumn(req: Request, res: Response) {
    const data = await this.columnService.updateColumnById(req.params.id, req.body)
    return new OKResponse(data).send(res)
  }

  async deleteColumn(req: Request, res: Response) {
    const data = await this.columnService.deleteColumnById(req.params.id)
    return new OKResponse(data).send(res)
  }

  async moveCardBetweenColumns(req: Request, res: Response) {
    console.log(req.body)
    const data = await this.columnService.moveCardBetweenColumns(req.body)
    return new OKResponse(data).send(res)
  }
}
