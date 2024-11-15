import { inject, injectable } from 'inversify'
import { dtoCreateInvitation } from '~/dtos/dtoInvitation'
import { BoardRepository } from '~/repositories/board.repository'
import { UserRepository } from '~/repositories/user.repository'
import { NAME_SERVICE_INJECTION } from '~/utils/constant.util'
import { BadRequest, NotFoundError } from '~/utils/error-response.util'
import { convertObjectId } from '~/utils/mongoose.util'
import { InvitationRepository } from './../repositories/invitation.repository'

const MESSAGE = {
  NOT_FOUND: 'User or board not found',
  INVALID_INVITATION: 'You can not invite yourself',
  ALREADY_EXIST_BOARD: 'Already exiting in board',
  ALREADY_EXIST_INVITATION: 'Already exiting invitation'
}

@injectable()
export class InvitationService {
  constructor(
    @inject(NAME_SERVICE_INJECTION.INVITATION_REPOSITORY) private readonly invitationRepository: InvitationRepository,
    @inject(NAME_SERVICE_INJECTION.USER_REPOSITORY) private readonly userRepository: UserRepository,
    @inject(NAME_SERVICE_INJECTION.BOARD_REPOSITORY) private readonly boardRepository: BoardRepository
  ) {}

  async createInvitation(userId: string, body: dtoCreateInvitation) {
    const existInvitation = await this.invitationRepository.findOne({
      invitee: convertObjectId(body.inviteeEmail),
      board: convertObjectId(body.boardId),
      inviter: convertObjectId(userId)
    })

    if (existInvitation) {
      throw new BadRequest(MESSAGE.ALREADY_EXIST_INVITATION)
    }

    const [invitee, board] = await Promise.all([
      this.userRepository.findByEmail(body.inviteeEmail),
      this.boardRepository.findById(body.boardId.toString())
    ])

    if (!invitee || !board) {
      throw new NotFoundError(MESSAGE.NOT_FOUND)
    }

    if (invitee._id.toString() === userId) {
      throw new BadRequest(MESSAGE.INVALID_INVITATION)
    }

    if (!!board?.memberIds && board?.memberIds.includes(convertObjectId(invitee._id.toString()))) {
      throw new BadRequest(MESSAGE.ALREADY_EXIST_BOARD)
    }

    const invitation = await this.invitationRepository.create({
      invitee: convertObjectId(invitee._id.toString()),
      board: convertObjectId(body.boardId),
      inviter: convertObjectId(userId)
    })

    return {
      _id: invitation._id
    }
  }
}
