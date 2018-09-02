import createReducer from '../app/lib/create-reducer'

export const ALERT_NOTIFICATION_SET = 'upload:ALERT_NOTIFICATION_SET'
export const UPLOAD_PROGRESS_SET = 'upload:UPLOAD_PROGRESS_SET'
export const UPLOAD_STATUS_FINISH = 'upload:UPLOAD_STATUS_FINISH'
export const UPLOAD_STATUS_RESET = 'upload:UPLOAD_STATUS_RESET'

const initialState = {
    alertNotification: null,
    progress: null,
    isUploadFinished: false
}

const alertNotificationSet = (state, { payload: { message } }) => ({
    ...state,
    alertNotification: message
})

const uploadProgressSet = (state, { payload: { progress } }) => ({
    ...state,
    progress
})

const uploadStatusFinish = state => ({
    ...state,
    isUploadFinished: true
})

const uploadStatusReset = state => ({
    ...state,
    isUploadFinished: false
})

export default createReducer(initialState, {
    [ALERT_NOTIFICATION_SET]: alertNotificationSet,
    [UPLOAD_PROGRESS_SET]: uploadProgressSet,
    [UPLOAD_STATUS_FINISH]: uploadStatusFinish,
    [UPLOAD_STATUS_RESET]: uploadStatusReset
})
