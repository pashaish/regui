import { app, BrowserWindow } from 'electron';
import path from 'path';
import reload from 'electron-reload';

reload(path.resolve(__dirname, '..'), {});

async function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    win.loadFile(path.resolve(__dirname, '../index.html'));
}

app.whenReady().then(() => {
    createWindow();
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

