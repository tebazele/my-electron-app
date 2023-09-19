
// import two electron modules (app, BrowserWindow)
// app controls application's event lifecycle
// BrowserWindow creates and manages app windows 
const { app, BrowserWindow } = require('electron')

// Instantiate a window
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })
// load the index.html file
  win.loadFile('index.html')
}

// many of Electron's modules are Node event emitters and are asynchronous
// NOTE app.whenReady == app.on('ready', <callback>)
app.whenReady().then(() => {
  createWindow()

  // For macOS, open a window when app is activated
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// For windows and linux, close the app when all the windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


// Check os difference with process.platform
// win32, linux, darwin

