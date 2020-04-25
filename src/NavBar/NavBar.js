import React from 'react'
import Brand from '../brand/Brand'
import Navigation from '../Navigation/Navigation'
import { Container, Row } from 'react-bootstrap';
export default function NavBar({resetState}) {
  return (
    <Container fluid>
      <Row>
        <Brand />
        <Navigation resetState = {resetState}/>
      </Row>
    </Container>
  )
}
