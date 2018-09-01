import React, { Component } from 'react';
import logo from './images/kraken_logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='header'>
          <img src={logo} className='header__logo' alt='Kraken' />
          <div class='header__nav nav'>
            <a href='/' className='nav__link'>List documents</a>
            <a href='/' className='nav__link'>Upload</a>
          </div>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
