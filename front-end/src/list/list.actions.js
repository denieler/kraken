import * as api from '../app/transport'
import { FILES_LOADING_START, FILES_LOADED } from './list.reducers'

const startLoadingFiles = () => ({
    type: FILES_LOADING_START
})

const filesLoaded = files => ({
    type: FILES_LOADED,
    payload: { files }
})

export const loadFiles = () => async (dispatch) => {
    dispatch(startLoadingFiles())

    const files = await api.getFiles()
    dispatch(filesLoaded(files))
}

export const deleteFile = id => async (dispatch) => {
    await api.deleteFile(id)
}
