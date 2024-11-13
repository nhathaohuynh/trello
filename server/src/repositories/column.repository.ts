import { injectable } from 'inversify'
import ColumnModel, { IColumn } from '~/databases/models/column.model'
import { BaseRepository } from './repository.abstract'

@injectable()
export class ColumnRepository extends BaseRepository<IColumn> {
  constructor() {
    super(ColumnModel)
  }
}
