const fs = require('fs')
const path = require('path')

const keepKeys = ['electron-window-state']

const packageJsonSrcPath = path.join(__dirname, 'package.json')
const packageJsonDestPath = path.join(__dirname, 'out/screen-win32-x64/resources/app/package.json')

const packageJson = JSON.parse(fs.readFileSync(packageJsonSrcPath, 'utf-8'))
delete packageJson.devDependencies
let dependencies = {}

keepKeys.forEach(key => {
  dependencies[key] = packageJson.dependencies[key]
})

packageJson.dependencies = dependencies;

fs.writeFileSync(packageJsonDestPath, JSON.stringify(packageJson), 'utf-8')