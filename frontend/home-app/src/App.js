import React, { Component } from 'react';
import HomeApp from './components/home/HomeApp';
import './App.css';
import './bootstrap.css'

class App extends Component {
  render() {
    return (
      <div className="App">
         <HomeApp/>
      </div>
    );
  }
}

export default App;