const getUpload = state => state.upload

export const getAlertNotification = state => getUpload(state).alertNotification
export const getUploadProgress = state => getUpload(state).progress
