import { Request, Response, NextFunction } from 'express'

import QuizzService from '../service/quizzService'

const service = new QuizzService()

export default class QuizzController {
  async getQuizz (req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.getQuizz()
      return res.status(200).json({ data: data })
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  async createOne (req: Request, res: Response, next: NextFunction) {
    try {
      const data = await service.saveQuizz(req.body)

      return res.status(201).json({ data: data })
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  async getOne (req: Request, res: Response, next: NextFunction) {
    try {
      if(typeof req.query.id === 'string'){
        const id = req.query.id
        const data = await service.getOne(id)
        return res.status(200).json({ data: data })
      }

      
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  async deleteOne (req: Request, res: Response, next: NextFunction) {
    try{
      if(typeof req.query.id === 'string'){
        const id = req.query.id
        const data = await service.deleteOne(id)
        return res.status(200).json({ data: data })
      }
    }catch (error) {
      return res.status(400).json(error)
    }
  }

  async updateOne(req: Request, res: Response, next: NextFunction) {
    try{
      if(typeof req.query.id === 'string'){
        const id = req.query.id
        const data = await service.updateOne(id, req.body)
        return res.status(200).json({ data: data })
      }
    }
    catch (error) {
      return res.status(400).json(error)
    }
  }

}
