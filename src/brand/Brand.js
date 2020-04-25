import React, { Component } from 'react'
import brand from './brain.png'
import './Brand.css'
import { Col } from 'react-bootstrap'
export default class Brand extends Component {
  render() {
    return (
      <Col className="Brand">
        <img src={brand} />
      </Col>
    )
  }
}
