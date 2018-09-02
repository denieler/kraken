import {
    isSupportedImageSize,
    isSupportedImageType
} from '../app/lib/file-validation'
import { imageToBase64 } from '../app/lib/image-to-base64'
import { uploadFile } from '../app/transport'
import { SHOW_ALERT_NOTIFICATION, CHANGE_FILE_UPLOAD_PROGRESS } from './upload.reducers'

const showAlertNotification = message => ({
    type: SHOW_ALERT_NOTIFICATION,
    payload: { message }
})
const changeFileUploadProgress = progress => ({
    type: CHANGE_FILE_UPLOAD_PROGRESS,
    payload: { progress }
})

const pickFile = file => (dispatch, getState) => {
    dispatch(changeFileUploadProgress(0))

    return uploadFile(file, {
        onProgress: (progress) => dispatch(changeFileUploadProgress(progress))
    })
    .then(({src}) => {
        // do something with the `src`
    })
    .catch((err, {aborted} = {}) => {
        if (aborted) return

        console.error(err)
        dispatch(showAlertNotification('File upload failed'))
    })
}

export const pickContentFromFile = file => dispatch => {
    if (!isSupportedImageType(file)) {
        return dispatch(showAlertNotification('Invalid file type'))
    }
    if (!isSupportedImageSize(file)) {
        return dispatch(showAlertNotification('Invalid file size'))
    }
  
    const { name, type } = file
  
    return imageToBase64(file)
        .then(hash => {
            const fileObject = {
                content: hash,
                name
            }
            dispatch(pickFile(fileObject))
        }
    )
}
