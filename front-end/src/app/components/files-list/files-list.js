import React from 'react'
import cross from '../../../images/cross.png'
import './files-list.css'

const FilesList = ({ files, onDelete }) =>
    <div className='files-list'>
        {
            files.map(file =>
                <div className='file' key={file.id}>
                    <div className='file__name'>{file.name}</div>
                    <div>
                        <a href='#' onClick={onDelete.bind(this, file.id)}>
                            <img src={cross} className='file__icon' alt='Delete' />
                        </a>
                    </div>
                </div>
            )
        }
    </div>

export default FilesList
