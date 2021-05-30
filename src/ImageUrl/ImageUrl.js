import React, { Component } from 'react'
import { Button, Col } from 'react-bootstrap'
import './ImageUrl.css'

const ImageUrl = ({onButtonSubmit, onInputChange}) => {
  return (
    <div>
      <p>{'This Magic Brain will detect faces in your pictures. Give it a try.'}</p>
      <div className='imageInputContainer'>
        <input placeholder='Paste picture URL' className='imageInput' type="text" onChange={onInputChange}/>
      <Button className="detect" type="button" onClick={onButtonSubmit}>Detect</Button>
      </div>
    </div>
  )
}

export default ImageUrl