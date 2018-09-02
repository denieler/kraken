import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pickContentFromFile } from './upload.actions'
import FileUploader from '../app/components/file-uploader'
import { getUploadProgress, getAlertNotification } from './upload.selectors'
import './upload.css'

class Upload extends Component {
  render() {
    const { handleUploadFile, alertNotification, progress } = this.props
    return (
      <div className='upload'>
        <h1>Upload</h1>
        <FileUploader onUploadFile={handleUploadFile} />

        { alertNotification !== null && <div className='upload__error'>{alertNotification}</div>}
        { alertNotification === null && progress !== null && <div className='upload__progress'>Uploading: {progress}%</div> }
      </div>
    )
  }
}
  
const mapStateToProps = state => {
  return {
    alertNotification: getAlertNotification(state),
    progress: getUploadProgress(state)
  }
}

const mapDispatchToProps = {
  handleUploadFile: pickContentFromFile
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload)
