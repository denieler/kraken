import {
    isSupportedImageSize,
    isSupportedImageType
} from '../app/lib/file-validation'
import { imageToBase64 } from '../app/lib/image-to-base64'
import { uploadFile } from '../app/transport'
import {
    ALERT_NOTIFICATION_SET,
    UPLOAD_PROGRESS_SET,
    UPLOAD_STATUS_FINISH,
    UPLOAD_STATUS_RESET
} from './upload.reducers'

const alertNotificationSet = message => ({
    type: ALERT_NOTIFICATION_SET,
    payload: { message }
})
const uploadProgressSet = progress => ({
    type: UPLOAD_PROGRESS_SET,
    payload: { progress }
})
const uploadStatusFinish = () => ({
    type: UPLOAD_STATUS_FINISH
})
export const uploadStatusReset = () => ({
    type: UPLOAD_STATUS_RESET
})

const pickFile = file => (dispatch, getState) => {
    dispatch(uploadProgressSet(0))

    return uploadFile(file, {
        onProgress: progress => dispatch(uploadProgressSet(progress))
    })
    .then(() => {
        setTimeout(() => {
            dispatch(uploadProgressSet(null))
            dispatch(uploadStatusFinish())
        }, 1000)
    })
    .catch((err, {aborted} = {}) => {
        if (aborted) return

        console.error(err)
        dispatch(alertNotificationSet('File upload failed'))
    })
}

export const pickContentFromFile = file => async (dispatch) => {
    dispatch(alertNotificationSet(null))
    dispatch(uploadProgressSet(null))

    if (!isSupportedImageType(file)) {
        return dispatch(alertNotificationSet('Invalid file type'))
    }
    if (!isSupportedImageSize(file)) {
        return dispatch(alertNotificationSet('Invalid file size'))
    }
  
    const { name, type } = file
  
    const hash = await imageToBase64(file)
    const fileObject = {
        content: hash,
        name
    }
    dispatch(pickFile(fileObject))
}
