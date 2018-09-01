import createReducer from '../app/lib/create-reducer'

export const FILES_LOADING_START = 'list:FILES_LOADING_START'
export const FILES_LOADED = 'list:FILES_LOADED'

const initialState = {
    isLoading: false,
    files: []
}

const filesLoadingStart = state => ({
    ...state,
    isLoading: true
})

const filesLoaded = (state, { payload: { files } }) => ({
    ...state,
    isLoading: false,
    files
})

export default createReducer(initialState, {
    [FILES_LOADING_START]: filesLoadingStart,
    [FILES_LOADED]: filesLoaded
})
