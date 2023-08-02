import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {

  state = {
    progress : 0
  }
  setProgress=(progress)=>{
    this.setState({progress : progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
          height={4}
        color='#f11946'
        progress={this.state.progress}
      />
          <Routes>
            <Route path='/' element={<News setProgress = {this.setProgress} category="general" />} />
            <Route path='/business' element={<News setProgress = {this.setProgress}  category="business" />} />
            <Route path='/entertainment' element={<News setProgress = {this.setProgress}  category="entertainment" />} />
            <Route path='/health' element={<News setProgress = {this.setProgress}  category="health" />} />
            <Route path='/science' element={<News setProgress = {this.setProgress}  category="science" />} />
            <Route path='/sports' element={<News setProgress = {this.setProgress}  category="sports" />} />
            <Route path='/technology' element={<News setProgress = {this.setProgress}  category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
