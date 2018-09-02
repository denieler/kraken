import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Spacer from '../spacer'
import cross from '../../../images/cross.png'
import './files-list.css'

const FilesList = ({ files, onDelete }) => {
    if (!files || !files.length) {
        return <div className='files-list files-list--centered'>
            There are no uploaded files yet. Try how it works :)
        </div>
    }

    return <TransitionGroup className='files-list'>
    {
        files.map(file =>
            <CSSTransition key={file.id} timeout={300} classNames='file-disappear'>
                <Spacer right={1} bottom={1}>
                    <div className='file'>
                        <div className='file__name'>{file.name}</div>
                        <a href='#' onClick={onDelete.bind(this, file.id)}>
                            <img src={cross} className='file__icon' alt='Delete' />
                        </a>
                    </div>
                </Spacer>
            </CSSTransition>
        )
    }
    </TransitionGroup>
}

export default FilesList
