import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pickContentFromFile } from './upload.actions'
import FileUploader from '../app/components/file-uploader'

class Upload extends Component {
  render() {
    const { handleUploadFile } = this.props
    return (
      <div className='list'>
        <h1>Upload</h1>
        <FileUploader onUploadFile={handleUploadFile} />
      </div>
    )
  }
}
  
const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = {
  handleUploadFile: pickContentFromFile
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload)
