import { injectable } from 'inversify'
import BoardModel, { IBoard } from '~/databases/models/board.model'
import { convertObjectId } from '~/utils/mongoose.util'
import { BaseRepository } from './repository.abstract'

@injectable()
export class BoardRepository extends BaseRepository<IBoard> {
  constructor() {
    super(BoardModel)
  }

  getDetailsBoard(userId: string, boardId: string) {
    return this.model
      .findOne({
        _id: convertObjectId(boardId),
        _destroy: false,
        $or: [
          {
            ownerIds: {
              $all: [convertObjectId(userId)]
            }
          },
          {
            memberIds: {
              $all: [convertObjectId(userId)]
            }
          }
        ]
      })
      .populate({
        path: 'columns',
        populate: {
          path: 'cards',
          model: 'card'
        }
      })
  }

  getListBoardByUserId(userId: string, skip: number, litmit: number) {
    const condition = {
      _destroy: false,
      $or: [
        {
          ownerIds: {
            $all: [convertObjectId(userId)]
          }
        },
        {
          memberIds: {
            $all: [convertObjectId(userId)]
          }
        }
      ]
    }

    return this.model.aggregate(
      [
        {
          $match: condition
        },
        {
          $sort: {
            title: 1
          }
        },

        {
          $facet: {
            boards: [
              {
                $skip: skip
              },
              {
                $limit: litmit
              }
            ],
            total: [
              {
                $count: 'total'
              }
            ]
          }
        }
      ],
      {
        collation: { locale: 'en' }
      }
    )
  }
}
