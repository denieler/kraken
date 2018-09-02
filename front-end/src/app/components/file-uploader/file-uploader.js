import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import {
    SUPPORTED_MEDIA_TYPES,
    MAX_FILESIZE,
    isSupportedImageSize,
    isSupportedImageType
} from '../../lib/file-validation'
import './file-uploader.css'

class FileUploader extends Component {
    state = {
        validationMessage: null
    }

    handleFileDrop = (accepted, rejected) => {
        const { onUploadFile } = this.props
        if (accepted[0]) {
            this.setState({ validationMessage: null })
            return onUploadFile(accepted[0])
        } else if (rejected[0]) {
            let validationMessage
            const isSizeValid = isSupportedImageSize(rejected[0])
            const isTypeValid = isSupportedImageType(rejected[0])
            if (!isTypeValid) {
                validationMessage = 'This is not valid file type.'
            } else if (!isSizeValid) {
                validationMessage = 'You can upload so big file. Max size: 1MB'
            }
            this.setState({ validationMessage })
        }
    }

    render () {
      const { validationMessage } = this.state
  
      return (
        <Dropzone
            className='file-uploader'
            multiple={false}
            accept={SUPPORTED_MEDIA_TYPES.join(', ')}
            maxSize={MAX_FILESIZE}
            onDrop={this.handleFileDrop}>
            {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                if (isDragReject) {
                    return <div className='file-uploader__message'>Looks like this file doesn't work. Try another one.</div>
                }
                if (isDragActive) {
                    return <div className='file-uploader__message'>Drop it here</div>
                }

                return acceptedFiles.length
                    ? <div className='file-uploader__message'>Uploading...</div>
                    : <div>
                        <div className='file-uploader__message'><a href='#'>Upload</a> or drop your file here</div>
                        {validationMessage && <div className='file-uploader__error'>{validationMessage}</div>}
                    </div>
            }}
        </Dropzone>
      )
    }
  }

  FileUploader.defaultProps = {
    onUploadFile: () => {}
  }

  export default FileUploader