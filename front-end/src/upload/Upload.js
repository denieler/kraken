import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { pickContentFromFile, uploadStatusReset } from './upload.actions'
import FileUploader from '../app/components/file-uploader'
import { getUploadProgress, getAlertNotification, getIsUploadFinished } from './upload.selectors'
import './upload.css'

class Upload extends Component {
  render() {
    const {
      onUploadFile,
      uploadStatusReset,
      alertNotification,
      progress,
      isUploadFinished
    } = this.props

    if (isUploadFinished) {
      uploadStatusReset()
      return <Redirect to='/' />
    }

    return (
      <div className='upload'>
        <h1>Upload</h1>
        <FileUploader onUploadFile={onUploadFile} />

        { alertNotification !== null && <div className='upload__error'>{alertNotification}</div>}
        { alertNotification === null && progress !== null && <div className='upload__progress'>Uploading: {progress}%</div> }
      </div>
    )
  }
}
  
const mapStateToProps = state => {
  return {
    alertNotification: getAlertNotification(state),
    progress: getUploadProgress(state),
    isUploadFinished: getIsUploadFinished(state)
  }
}

const mapDispatchToProps = {
  onUploadFile: pickContentFromFile,
  uploadStatusReset: uploadStatusReset
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload)
