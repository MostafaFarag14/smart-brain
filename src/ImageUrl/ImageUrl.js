import React, { Component } from 'react'
import { Button, Col } from 'react-bootstrap'
import './ImageUrl.css'

const ImageUrl = ({onButtonSubmit, onInputChange}) => {
  return (
    <div className="ImageUrl">
      <p>{'This Magic Brain will detect faces in your pictures. Give it a try.'}</p>
      <Col>
      <input type="text" onChange={onInputChange}/>
      <Button className="detect" type="button" onClick={onButtonSubmit}>Detect</Button>
      </Col>
    </div>
  )
}

export default ImageUrl