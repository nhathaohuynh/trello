import 'dotenv/config'
import { nameStrateryValidation } from '~/http/routes/route-config-app'
import { DtoEnv } from '~/interface/dtos/env.dto'
import { validation } from '~/utils/validation.util'

const envData = validation<DtoEnv>(nameStrateryValidation.ENV_STRATEGY, process.env)
if (!envData) {
  process.exit(1)
}

const env = {
  DB_NAME: envData.DB_NAME,
  DB_URI: envData.DB_URI,
  APP_PORT: envData.PORT,
  BUILD_MODE: envData.BUILD_MODE
}

export default env
