import {
    isSupportedImageSize,
    isSupportedImageType
} from '../app/lib/file-validation'
import { imageToBase64 } from '../app/lib/image-to-base64'
import { uploadFile } from '../app/transport'
import {
    SHOW_ALERT_NOTIFICATION,
    CHANGE_FILE_UPLOAD_PROGRESS,
    FINISH_UPLOAD_PROCESS,
    RESET_UPLOAD_PROCESS
} from './upload.reducers'

const showAlertNotification = message => ({
    type: SHOW_ALERT_NOTIFICATION,
    payload: { message }
})
const changeFileUploadProgress = progress => ({
    type: CHANGE_FILE_UPLOAD_PROGRESS,
    payload: { progress }
})
const finishUploadProcess = () => ({
    type: FINISH_UPLOAD_PROCESS
})
export const resetUploadProcess = () => ({
    type: RESET_UPLOAD_PROCESS
})

const pickFile = file => (dispatch, getState) => {
    dispatch(changeFileUploadProgress(0))

    return uploadFile(file, {
        onProgress: progress => dispatch(changeFileUploadProgress(progress))
    })
    .then(() => {
        setTimeout(() => {
            dispatch(changeFileUploadProgress(null))
            dispatch(finishUploadProcess())
        }, 1000)
    })
    .catch((err, {aborted} = {}) => {
        if (aborted) return

        console.error(err)
        dispatch(showAlertNotification('File upload failed'))
    })
}

export const pickContentFromFile = file => async (dispatch) => {
    dispatch(showAlertNotification(null))
    dispatch(changeFileUploadProgress(null))

    if (!isSupportedImageType(file)) {
        return dispatch(showAlertNotification('Invalid file type'))
    }
    if (!isSupportedImageSize(file)) {
        return dispatch(showAlertNotification('Invalid file size'))
    }
  
    const { name, type } = file
  
    const hash = await imageToBase64(file)
    const fileObject = {
        content: hash,
        name
    }
    dispatch(pickFile(fileObject))
}
