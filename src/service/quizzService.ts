import { readFileSync, writeFileSync } from 'node:fs'
import path from 'path'
import QuizzModel from '../models/quizzModel'
// import {ModelType} from '../utils/interfaces/quizzInterface'

const quizzModel = new QuizzModel()

export default class QuizzService {
  file: string

  constructor () {
    this.file = path.resolve(__dirname, '..', 'bin', 'quizz.json')
  }

  getQuizz () {
    return quizzModel.getAll();
  }

  saveQuizz (data: any) {
    return quizzModel.saveOne(data);
  }

  getOne(id: string){
      return quizzModel.getOneById(id);
  }

  deleteOne(id: string){
    return quizzModel.deleteOneById(id);

  }

  updateOne(id:string, data: any){
      return quizzModel.updateById(id, data)
  }
}
