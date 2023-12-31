import express, { Application, NextFunction, Request, Response } from 'express'
import { routes } from './routes'
import { logger } from './utils/logger'
import bodyParser from 'body-parser'
import cors from 'cors'

import './utils/connectDB'
import deserializeToken from './middleware/deserializedToken'

const app: Application = express()
const port: number = 5000

// parse body request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// cors access handler
app.use(cors())
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

app.use(deserializeToken)

routes(app)

app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`)
})
