import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import cross from '../../../images/cross.png'
import './files-list.css'

const FilesList = ({ files, onDelete }) =>
    <TransitionGroup className='files-list'>
    {
        files.map(file =>
            <CSSTransition key={file.id} timeout={300} classNames='file-disappear'>
                <div className='file'>
                    <div className='file__name'>{file.name}</div>
                    <a href='#' onClick={onDelete.bind(this, file.id)}>
                        <img src={cross} className='file__icon' alt='Delete' />
                    </a>
                </div>
            </CSSTransition>
        )
    }
    </TransitionGroup>

export default FilesList
