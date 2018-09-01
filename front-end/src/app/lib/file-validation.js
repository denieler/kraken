export const MAX_FILESIZE = 1000000

export const SUPPORTED_MEDIA_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif'
]

export function isSupportedImageType (file) {
  return file && file.type && SUPPORTED_MEDIA_TYPES.indexOf(file.type) !== -1
}

export function isSupportedImageSize (file) {
  return file && file.size && file.size <= MAX_FILESIZE
}
