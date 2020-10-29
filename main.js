//imports
const path = require('path');
const url = require('url');

//deconstruct imports
const { app, globalShortcut, BrowserWindow, Menu,  ipcMain } = require('electron');

//variables for windows
let mainWindow;
let addWindow;

// Adding accelerator: https://www.electronjs.org/docs/api/accelerator
app.whenReady().then(() => {
  //message when app ready
  console.log("Wine List Maker app...");
  // Register a 'CommandOrControl+Y' shortcut listener.
  globalShortcut.register('CommandOrControl+Q', () => {
    // message when shortcut used to close app
    console.log("Closing app...");
    app.quit();
  })

  globalShortcut.register('Q', () => {
    // message when shortcut used to close app
    console.log("Closing app...");
    app.quit();
  })
})


//function to create main window
function createWindow() {
  mainWindow = new BrowserWindow( {
    width: 800,
    height: 600,
    icon: __dirname + "/images/icons/wine-glass2.png",
    webPreferences: {
      nodeIntegration: true
    }
    
  })

  mainWindow.loadFile('mainwindow.html')
  
  mainWindow.on('closed', function() {
    app.quit();
  });


  ipcMain.on('item:add', function(e, item) {
    console.log(JSON.stringify(item));//test data got here to main
    mainWindow.webContents.send('item:add', item);
    addWindow.close();
  });

  let menu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(menu)

}//end createWindow

//function to create window for Adding
function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 430,
    title: 'Add Item',
    webPreferences: {
      nodeIntegration: true
    }
  });

  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addwindow.html'),
    protocol: 'file:',
    slashes: true
  }));

  addWindow.on('close', function() {
    addWindow = null;
  });

}//end create addWindow

function clearWindow()
{
    mainWindow.webContents.send('item:clear');
}//end function clearWindow


//template for menu
const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add',
        click() {createAddWindow()}
      },
      {
        label: 'Clear',
        click(){clearWindow()}
      },
      {
        label: 'Quit',
        click(){app.quit()}

      }
    ]
  }
];

app.on('ready', createWindow)



