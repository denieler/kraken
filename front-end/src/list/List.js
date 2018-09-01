import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadFiles } from './list.actions'
import Loader from '../app/components/loader'
import FilesList from '../app/components/files-list'
import { getIsLoading } from './list.selectors'
import './list.css'

class List extends Component {
  componentDidMount () {
    const { loadFiles } = this.props
    loadFiles()
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
          : <FilesList files={files} />
        }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoading: getIsLoading(state)
  }
}

const mapDispatchToProps = {
  loadFiles: loadFiles
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
