const { app, BrowserWindow } = require('electron');
const path = require('path');
const db = require('./database'); // Подключаем базу данных

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        backgroundColor: '#1C1C1C', // Темный фон
    });

    mainWindow.loadFile('index.html');
    // mainWindow.webContents.openDevTools(); // Раскомментируй для отладки
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});