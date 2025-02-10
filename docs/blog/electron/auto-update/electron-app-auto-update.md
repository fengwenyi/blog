# Electron App 自动更新

## 开发

#### 添加依赖

```shell
pnpm add electron-updater -S
```

#### 开发

`electron/update.ts`

```typescript
import { autoUpdater } from 'electron-updater';
import logger from './utils/logger';

var mainWin = null

export default function checkUpdate(win, ipcMain) {
    autoUpdater.autoDownload = true; // 自动下载
    autoUpdater.autoInstallOnAppQuit = true; // 应用退出后自动安装
    mainWin = win;
    // 检测是否有更新包并通知
    autoUpdater.checkForUpdatesAndNotify().catch();
    // 监听渲染进程的 install 事件，触发退出应用并安装
    ipcMain.handle('install', () => autoUpdater.quitAndInstall());
    autoUpdater.on('update-available', (info) => {
        logger.info('有新版本需要更新');
    });
    autoUpdater.on('update-not-available', (info) => {
    });
    autoUpdater.on('download-progress', (prog) => {
        let speed = Math.ceil(prog.bytesPerSecond / 1000); // 网速
        let percent = Math.ceil(prog.percent); // 百分比
        logger.info('下载进度: ' + percent + '%');
        mainWin.webContents.send('update', {
            speed,
            percent,
        });
    });
    autoUpdater.on('update-downloaded', (info) => {
        logger.info('下载完成, ' + info.downloadedFile);
        mainWin.webContents.send('downloaded');
        // 下载完成后强制用户安装，不推荐
        // autoUpdater.quitAndInstall();
    });
};
```

`electron/index.ts`

```typescript
import checkUpdate from './update'

async function createWindow() {
  win = new BrowserWindow({

  })

  checkUpdate(win, ipcMain)
}
```

`preload/index.ts`

```TypeScript
contextBridge.exposeInMainWorld('api', {
  toInstall: () => ipcRenderer.invoke('install'),
  onUpdate: (callback) => ipcRenderer.on('update', callback),
  onDownloaded: (callback) => ipcRenderer.on('downloaded', callback),
  on: (channel: string, callback: any) => ipcRenderer.on(channel, callback),
});
```

`src/type/electron.d.ts`

```TypeScript
interface Window {
    api: {
        toInstall: () => Promise<void>
        onUpdate: (callback: (event: Electron.IpcRendererEvent, info: { speed: number, percent: number }) => void) => void
        onDownloaded: (callback: (event: Electron.IpcRendererEvent) => void) => void
        on: (channel: string, callback: (event: any, ...args: any[]) => void) => void
    }
} 
```

`src/components/VersionUpdate.vue`

```vue
<template>
    <div class="notify-version-update" v-if="showUpdateNotify">
        <span class="update-text">{{ updateText }}</span>
        <span class="update-progress" v-if="showProgress">
            <span>网速: {{ downloadSpeed }}kb/s</span>
            <span>进度: {{ progress }}%</span>
        </span>
    </div>

    <!-- 更新确认弹窗 -->
    <div class="update-confirm-modal" v-if="showConfirmModal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>更新提示</h3>
            </div>
            <div class="modal-body">
                新版本已下载完成，是否立即安装？
                <p class="tip">安装过程中会自动关闭应用</p>
            </div>
            <div class="modal-footer">
                <button class="btn-cancel" @click="closeConfirmModal">稍后安装</button>
                <button class="btn-confirm" @click="confirmInstall">立即安装</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const showUpdateNotify = ref(false)
const showProgress = ref(false)
const showConfirmModal = ref(false)
const updateText = ref('')
const downloadSpeed = ref(0)
const progress = ref(0)

// 关闭确认弹窗
const closeConfirmModal = () => {
    showConfirmModal.value = false
}

// 确认安装
const confirmInstall = () => {
    showConfirmModal.value = false
    window.api.toInstall()
}

onMounted(() => {
    // 监听更新进度
    window.api.onUpdate((event, info) => {
        showUpdateNotify.value = true
        showProgress.value = true
        downloadSpeed.value = info.speed
        progress.value = info.percent
        updateText.value = '检测到新版本，正在下载...'
    })

    // 监听下载完成
    window.api.onDownloaded(() => {
        showProgress.value = false
        updateText.value = '新版本下载完成'
        showConfirmModal.value = true
    })
})
</script>

<style>
.notify-version-update {
    padding: 8px 20px;
    background-color: #fff6e6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #666;
    font-size: 12px;
    z-index: 9999;
    border-bottom: 1px solid #ffe7ba;
    color: #d46b08;
    font-weight: 600;
    letter-spacing: 2px;
}

.update-progress :first-child {
    margin-right: 12px;
}

/* 确认弹窗样式 */
.update-confirm-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
}

.modal-content {
    background: #fff;
    border-radius: 8px;
    width: 400px;
    padding: 20px;
}

.modal-header {
    margin-bottom: 20px;
}

.modal-header h3 {
    margin: 0;
    color: #333;
    font-size: 18px;
}

.modal-body {
    margin-bottom: 24px;
    color: #666;
    font-size: 14px;
}

.modal-body .tip {
    margin-top: 8px;
    color: #999;
    font-size: 12px;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}

.modal-footer button {
    padding: 8px 20px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s;
}

.btn-cancel {
    background: #f5f5f5;
    color: #666;
}

.btn-cancel:hover {
    background: #eee;
}

.btn-confirm {
    background: #1890ff;
    color: #fff;
}

.btn-confirm:hover {
    background: #40a9ff;
}
</style>
```

`src/App.vue`

```vue
<template>
    <VersionUpdate />
    <router-view></router-view>
</template>

<script setup lang="ts">
import VersionUpdate from '@/components/VersionUpdate.vue'
</script>
```


`electron-builder.json5`

```json5
{
  "publish": [
    {
      "provider": "generic",
      "url": "https://xxx/updater/ele-app"
    }
  ]
}
```

## 打包

以 Window 平台为例，打包后会生成多个文件，以下两个需要上传：

xxx.exe（安装包）
latest.yml（版本配置）

## 服务器配置

`nginx`

```properties
location /updater {
   add_header Access-Control-Allow-Origin *;
   add_header Access-Control-Allow-Credentials true;
   add_header Access-Control-Allow-Methods GET,POST;
   alias /data/updater;
   sendfile on;
   autoindex on;
}
```



