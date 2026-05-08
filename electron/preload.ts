import { contextBridge, ipcRenderer } from 'electron'

// ─── Exposed API Surface ───────────────────────────────────────────────────────
// All IPC calls from the renderer go through this bridge.
// The renderer never has direct access to Node/Electron APIs.

const api = {
  // Window controls
  window: {
    minimize: () => ipcRenderer.invoke('window:minimize'),
    maximize: () => ipcRenderer.invoke('window:maximize'),
    close:    () => ipcRenderer.invoke('window:close'),
    isMaximized: () => ipcRenderer.invoke('window:isMaximized'),
  },

  // App info
  app: {
    version: () => ipcRenderer.invoke('app:version'),
    path:    () => ipcRenderer.invoke('app:path'),
  },

  // Shell
  shell: {
    openExternal: (url: string) => ipcRenderer.invoke('shell:openExternal', url),
  },
}

contextBridge.exposeInMainWorld('meipay', api)

// TypeScript type augmentation for renderer
export type MeiPayAPI = typeof api
