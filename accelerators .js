const {ipcRenderer, remote} = require('electron')
         const {globalShortcut} = remote
         globalShortcut.register('CommandOrControl+O', () => {
            ipcRenderer.send('openFile', () => {
               console.log("Event sent.");
            })
            
            ipcRenderer.on('fileData', (event, data) => {
               document.write(data)
            })
         })