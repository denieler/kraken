import { UPLOAD_URL } from './constants/api'

export function uploadFile (file, callbacks) {
    const {
        onProgress = () => null,
        onXHR = () => null
    } = callbacks

    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest() /* eslint no-undef: off */

        onXHR(xhr)

        const body = file

        xhr.open('POST', UPLOAD_URL, true)
        xhr.setRequestHeader('Content-Type', 'application/json')

        /* onProgress */
        xhr.upload.addEventListener('progress', evt => {
            onProgress(evt.loaded / evt.total * 100)
        })

        /* onLoad */
        xhr.addEventListener('load', () => {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.response))
                } else if (xhr.status >= 300) {
                    reject(new Error(xhr.statusText))
                }
            }
        })

        /* onError */
        xhr.upload.addEventListener('error', () => {
            reject(new Error(xhr.statusText))
        })

        /* onAbort */
        xhr.upload.addEventListener('abort', () => {
            reject(null, {aborted: true})
        })

        xhr.send(JSON.stringify(body))
    })
}

export const getFiles = () => {
    return new Promise(resolve => {
        setTimeout(_ => {
            resolve([{
                    id: 1,
                    name: 'filename.jpg'
                }, {
                    id: 2,
                    name: 'filename2.jpg'
                }
            ])
        }, 1000)
    })
}

export const deleteFile = id => {
    return new Promise(resolve => {
        setTimeout(_ => {
            resolve()
        }, 1000)
    })
}