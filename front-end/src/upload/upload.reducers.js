import createReducer from '../app/lib/create-reducer'

export const SHOW_ALERT_NOTIFICATION = 'upload:SHOW_ALERT_NOTIFICATION'
export const CHANGE_FILE_UPLOAD_PROGRESS = 'upload:CHANGE_FILE_UPLOAD_PROGRESS'

const initialState = {
    alertNotification: null,
    progress: null
}

const showAlertNotification = (state, { payload: { message } }) => ({
    ...state,
    alertNotification: message
})

const changeFileUploadProgress = (state, { payload: { progress } }) => ({
    ...state,
    progress
})

export default createReducer(initialState, {
    [SHOW_ALERT_NOTIFICATION]: showAlertNotification,
    [CHANGE_FILE_UPLOAD_PROGRESS]: changeFileUploadProgress
})
