import { nameStrateryValidation } from '~/http/routes/route-config-app'
import { Constructor } from '~/utils/type.util'
import { DtoBase } from '../base/DtoBase'
import { DtoCreateBoard, DtoUpdateBoard } from './dtoBoard'
import { DtoCreateCard } from './dtoCard copy'
import { DtoCreateColumn } from './dtoColumn'
import { DtoUpdateInformation, DtoUpdatePassword, DtoUserLogin, DtoUserRegistration, DtoVerifyToken } from './dtoUser'
import { DtoEnv } from './env.dto'

const dtoRegistry: Map<string, Constructor<DtoBase>> = new Map()

dtoRegistry.set(nameStrateryValidation.ENV_STRATEGY, DtoEnv)
dtoRegistry.set(nameStrateryValidation.CREATE_BOARD, DtoCreateBoard)
dtoRegistry.set(nameStrateryValidation.CREATE_COLUMN, DtoCreateColumn)
dtoRegistry.set(nameStrateryValidation.CREATE_CARD, DtoCreateCard)
dtoRegistry.set(nameStrateryValidation.UPDATE_BOARD, DtoUpdateBoard)
dtoRegistry.set(nameStrateryValidation.SIGNUP, DtoUserRegistration)
dtoRegistry.set(nameStrateryValidation.SIGNIN, DtoUserLogin)
dtoRegistry.set(nameStrateryValidation.UPDATE_INFORMATION, DtoUpdateInformation)
dtoRegistry.set(nameStrateryValidation.UPDATE_PASSWORD, DtoUpdatePassword)
dtoRegistry.set(nameStrateryValidation.VERIFY_TOKEN, DtoVerifyToken)

export default dtoRegistry
