const { app, BrowserWindow } = require('electron')
const execa = require('execa')
let mainWindow

const compileStep = index => {
  let resolved = false
  return new Promise((resolve, reject) => {
    const regex = new RegExp(/(✨|🚨|⏳|Server|Built|Building|\[\d+\/\d+\])/)
    execa('parcel', [`${index}`]).stdout.on('data', data => {
      if (regex.test(`${data}`)) {
        console.log(`${data}`)
        if (!resolved) {
          resolved = true
          resolve()
        }
      }
    })
  })
}

const createWindow = () => {
  compileStep('src/index.pug').then(d => {
    mainWindow = new BrowserWindow({ width: 800, height: 600 })
    mainWindow.loadURL(`http://localhost:1234`)
    //   mainWindow.webContents.openDevTools()
    mainWindow.on('closed', () => (mainWindow = null))
  })
}
app.on('ready', createWindow)
app.on('window-all-closed', () => app.quit())
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
