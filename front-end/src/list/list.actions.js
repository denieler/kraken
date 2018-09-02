import * as api from '../app/transport'
import { FILES_LOADING_START, FILES_UPDATE } from './list.reducers'

const filesLoadingStart = () => ({
    type: FILES_LOADING_START
})

const filesUpdate = files => ({
    type: FILES_UPDATE,
    payload: { files }
})

export const loadFiles = () => async (dispatch) => {
    dispatch(filesLoadingStart())

    const files = await api.getFiles()
    dispatch(filesUpdate(files))
}

export const deleteFile = id => async (dispatch) => {
    await api.deleteFile(id)

    const files = await api.getFiles()
    dispatch(filesUpdate(files))
}
