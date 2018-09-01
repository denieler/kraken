import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import logo from './images/kraken_logo.png'

import List from './list'
import Upload from './upload'

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Router>
          <React.Fragment>
            <header className='header'>
              <img src={logo} className='header__logo' alt='Kraken' />
              <div className='header__nav nav'>
                <Link to='/' className='nav__link'>List documents</Link>
                <Link to='/upload' className='nav__link'>Upload</Link>
              </div>
            </header>

            <div className='container'>
              <Route exact path='/' component={List} />
              <Route exact path='/upload' component={Upload} />
            </div>
          </React.Fragment>
        </Router>
      </div>
    )
  }
}

export default App
