export interface MenuPage {
  id: string
  uri: string
  fileSize: number
  order: number
}

export interface CaptureSession {
  pages: MenuPage[]
}

export const MAX_PAGES = 10
export const MIN_PAGES = 1
export const MAX_LONG_EDGE = 2048
export const JPEG_QUALITY = 0.85
export const MAX_FILE_SIZE_BYTES = 1_572_864 // 1.5 MB
