import { injectable } from 'inversify'
import UserModel, { IUser } from '~/databases/models/user.model'
import { BaseRepository } from './repository.abstract'

@injectable()
export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(UserModel)
  }

  findByEmail(email: string) {
    return this.findOne({ email })
  }
}
