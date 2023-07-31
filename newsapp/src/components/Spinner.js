import React, { Component } from 'react'
import loading from './loading.gif'

export class Spinner extends Component {
  render() {
    return (
      <div>
      
      <img style={{height:'50px', width:'50px'}} src={loading} alt="loading"/>
      </div>
    )
  }
}

export default Spinner