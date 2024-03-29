import express, { Express } from 'express'
import dotenv from 'dotenv'
import { resolve } from 'path'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import cors from 'cors'
// import { connectPostgreSqlDB } from "./services/sqlConnector"
import { logger } from './logger/index'
import * as swaggerJson from './swagger/swagger.json'
import * as swaggerUI from 'swagger-ui-express'
import { RegisterRoutes } from './swagger/routes'

dotenv.config({ path: resolve(__dirname, '../.env') })

const isValidPort = (): boolean => {
  const portAsNumber = Number(process.env.PORT)
  return !isNaN(portAsNumber) && portAsNumber >= 0 && portAsNumber < 65536
}

const port: number = isValidPort() ? Number(process.env.PORT) : 3000
const app: Express = express()

// if (!process.env.POSTGRESQL_URL) {
//   console.error(
//     '[error]: The "POSTGRESQL_URL" environment variable is required'
//   );
//   process.exit(1)
// }

// async function connectPostgreSql() {
//   const { POSTGRESQL_URL = null } = process.env

//   if (!POSTGRESQL_URL) {
//     console.error(
//       '[error]: The "POSTGRESQL_URL" environment variable is required'
//     );
//     process.exit(1);
//   }
//   await connectPostgreSqlDB()
// }

;(() => {
  app.use(helmet())
  app.use(cors())
  app.use(bodyParser.json({ limit: '5mb' }))
  app.use(bodyParser.urlencoded({ extended: true }))

  // await connectPostgreSql()
  RegisterRoutes(app)

  app.use(
    ['/openapi', '/docs', '/swagger'],
    swaggerUI.serve,
    swaggerUI.setup(swaggerJson)
  )

  app.listen(port, () => logger.info(`Running on ${port}`))
})()
