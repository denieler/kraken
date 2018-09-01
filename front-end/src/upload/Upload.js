import React, { Component } from 'react'
import FileUploader from '../app/components/file-uploader'

class Upload extends Component {
    render() {
      return (
        <div className='list'>
            <h1>Upload</h1>
            <FileUploader />
        </div>
      )
    }
  }
  
  export default Upload