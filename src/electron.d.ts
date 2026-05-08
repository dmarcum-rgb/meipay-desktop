import type { MeiPayAPI } from './electron/preload'

declare global {
  interface Window {
    meipay: MeiPayAPI
  }
}

export {}
