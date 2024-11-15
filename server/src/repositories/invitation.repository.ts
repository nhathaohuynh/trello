import { injectable } from 'inversify'
import { IInvitation, InvitationModel } from '~/databases/models/invitation.model'
import { BaseRepository } from './repository.abstract'

@injectable()
export class InvitationRepository extends BaseRepository<IInvitation> {
  constructor() {
    super(InvitationModel)
  }
}
