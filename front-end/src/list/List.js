import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadFiles, deleteFile } from './list.actions'
import Loader from '../app/components/loader'
import FilesList from '../app/components/files-list'
import { getIsLoading, getFiles } from './list.selectors'
import './list.css'

class List extends Component {
  componentDidMount () {
    const { loadFiles } = this.props
    loadFiles()
  }

  handleDeleteFile = (fileId) => {
    const { deleteFile } = this.props
    deleteFile(fileId)
  }

  render () {
    const { isLoading, files } = this.props

    return (
      <div className='list'>
        <h1>List</h1>

        <div className='list__content'>
        {
          isLoading
            ? <Loader />
            : <FilesList files={files} onDelete={this.handleDeleteFile} />
        }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoading: getIsLoading(state),
    files: getFiles(state)
  }
}

const mapDispatchToProps = {
  loadFiles: loadFiles,
  deleteFile: deleteFile
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
