// inversify.config.ts
import { Container } from 'inversify'
import 'reflect-metadata'
import { IBoard } from '~/databases/models/board.model'
import { ICard } from '~/databases/models/card.model'
import { IColumn } from '~/databases/models/column.model'
import { BoardController } from '~/http/controllers/board.controller'
import { CardController } from '~/http/controllers/card.controller'
import { ColumnController } from '~/http/controllers/column.controller'
import { IRepository } from '~/interface/base/IRepository.base'
import { BoardRepository } from '~/repositories/board.repository'
import { CardRepository } from '~/repositories/card.repository'
import { ColumnRepository } from '~/repositories/column.repository'
import { BoardService } from '~/services/board.service'
import { CardService } from '~/services/card.service'
import { ColumnService } from '~/services/column.service'

const container = new Container()

container.bind<IRepository<IBoard>>('BoardRepository').to(BoardRepository)
container.bind(BoardService).to(BoardService)
container.bind(BoardController).to(BoardController)

container.bind<IRepository<IColumn>>('ColumnRepository').to(ColumnRepository)
container.bind(ColumnService).to(ColumnService)
container.bind(ColumnController).to(ColumnController)

container.bind<IRepository<ICard>>('CardRepository').to(CardRepository)
container.bind(CardService).to(CardService)
container.bind(CardController).to(CardController)

export { container }