import { readFileSync, writeFileSync } from 'node:fs'
import path from 'path'
import { DataType } from '../utils/interfaces/quizzInterface'
import { v4 as uuidV4 } from 'uuid'

export default class QuizzModel {
  file: string

  constructor () {
    this.file = path.resolve(__dirname, '..', 'bin', 'quizz.json')
  }

  private getFile () {
    let file = readFileSync(this.file, { encoding: 'utf8' })
    return JSON.parse(file)
  }

  private writeFile (data: any) {
    const file = this.getFile()
    writeFileSync(this.file, JSON.stringify(data), { flag: 'w' })
  }

  getAll () {
    return new Promise((resolve, reject) => {
      const json = readFileSync(this.file, { encoding: 'utf8' })
      if (!json) reject('error')
      resolve(JSON.parse(json))
    })
  }

  saveOne (payload?: any) {
    return new Promise(async (resolve, reject) => {
      const id = uuidV4()

      if (!payload) {
        reject({ error: 'Cannot save without a payload' })
      } else {
        const file = this.getFile()

        payload.questions = payload.questions!.map(
          (question: any, index: number) => {
            if(typeof question)question = { [index.toString()]: question }
            return question
          }
        )

        Object.assign(file, { [id]: payload })

        this.writeFile(file)

        resolve(id)
      }
    })
  }

  getOneById (id: string) {
    return new Promise(async (resolve, reject) => {
      const file = this.getFile()

      const baseId = file[id]

      if (!baseId) reject({ error: "id doesn't exist" })

      resolve({ [id]: file[id] })
    })
  }

  deleteOneById (id: string) {
    return new Promise((resolve, reject) => {
      const file = this.getFile()

      const baseId = file[id]

      if (!baseId) reject({ error: "id doesn't exist" })

      let newFile = {}

      Object.keys(file).map(qId => {
        if (qId !== id) newFile = { ...newFile, [qId]: file[qId] }
      })

      this.writeFile(newFile)

      resolve(newFile)
    })
  }

  updateById (id: string, data: any) {
    return new Promise((resolve, reject) => {
      const file = this.getFile()
      const baseId = file[id]

      if (!baseId) reject({ error: "id doesn't exist" })

      file[id] = data

      this.writeFile(file)
      resolve({[id]:file[id]})
    })
  }
}
