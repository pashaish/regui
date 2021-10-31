import { app, BrowserWindow, session } from 'electron';
import path from 'path';
import reload from 'electron-reload';

reload(path.resolve(__dirname, '../dist'), {});

async function createWindow() {
    const win = new BrowserWindow({
        width: 1600,
        height: 1000,
        webPreferences: {
            nodeIntegrationInSubFrames: true,
            nodeIntegrationInWorker: true,
            nodeIntegration: true,
            contextIsolation: false,
            plugins: true,
        },
    });

    win.loadFile(path.resolve(__dirname, '../index.html'));
}

app.whenReady().then(async () => {
    createWindow();
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

