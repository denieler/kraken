import createReducer from '../app/lib/create-reducer'

export const SHOW_ALERT_NOTIFICATION = 'upload:SHOW_ALERT_NOTIFICATION'
export const CHANGE_FILE_UPLOAD_PROGRESS = 'upload:CHANGE_FILE_UPLOAD_PROGRESS'
export const FINISH_UPLOAD_PROCESS = 'upload:FINISH_UPLOAD_PROCESS'
export const RESET_UPLOAD_PROCESS = 'upload:RESET_UPLOAD_PROCESS'

const initialState = {
    alertNotification: null,
    progress: null,
    isUploadFinished: false
}

const showAlertNotification = (state, { payload: { message } }) => ({
    ...state,
    alertNotification: message
})

const changeFileUploadProgress = (state, { payload: { progress } }) => ({
    ...state,
    progress
})

const finishUploadProcess = state => ({
    ...state,
    isUploadFinished: true
})

const resetUploadProcess = state => ({
    ...state,
    isUploadFinished: false
})

export default createReducer(initialState, {
    [SHOW_ALERT_NOTIFICATION]: showAlertNotification,
    [CHANGE_FILE_UPLOAD_PROGRESS]: changeFileUploadProgress,
    [FINISH_UPLOAD_PROCESS]: finishUploadProcess,
    [RESET_UPLOAD_PROCESS]: resetUploadProcess
})
