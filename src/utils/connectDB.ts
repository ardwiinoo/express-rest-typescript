import mongoose from 'mongoose'
import CONFIG from '../config/environtment'
import { logger } from './logger'

mongoose
  .connect(`${CONFIG.db}`)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((err) => {
    logger.error(`[CONNECT DB]: ${err}`)
    process.exit(1)
  })
