import { Router, Request, Response, NextFunction } from 'express'

export const HealthRouter: Router = Router()

// http://localhost:5000/health
HealthRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    status: '200',
    data: 'Haloo'
  })
})
