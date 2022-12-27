import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import * as readline from 'node:readline/promises'
import path from 'path'
// const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const routeDir = path.resolve(__dirname, '..', '..', 'routes')
const routeTemplate = readFileSync(path.resolve(__dirname, 'template.ts'), {
  encoding: 'utf-8'
})

async function init () {
  const inputFileName = await rl.question('Especify route file name: ')

  const inputRoutes = await rl.question(
    "Especify it's routes separated by coma (,): "
  )

  const inputMethod = await rl.question(
    `Especify the method for routes in same order ${inputRoutes}: `
  )

  const routes = inputRoutes.split(',')
  const methods = inputMethod.split(',')

  let routeFile: any = routeTemplate.split(';')

  routes.forEach(async (route: string, index: number) => {
    routeFile.push(
      `\nrouter.route('/${route}').${methods[index]}('place the controller here')`
    )
  })

  routeFile = routeFile.join('')

  writeFileSync(`${routeDir}/${inputFileName}.ts`, routeFile, { flag: 'w+' })

  rl.close()

  
}

init()

rl.on('close', () => {
    console.log(readFileSync(routeDir,{encoding: 'utf-8'}))
  })

  //use ts-node src/scripts/router/creator.ts to run