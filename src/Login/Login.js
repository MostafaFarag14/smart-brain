import React, { Component } from 'react'
import { Form, Button, Container, Alert } from 'react-bootstrap'
import { useHistory, Redirect, Router } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      authorized: false
    }
  }

  disableLink = (e) => {
    e.preventDefault()
  }
  handleLogin = () => {
    const { getUserInfo } = this.props
    fetch('https://radiant-peak-65277.herokuapp.com/login',
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body:
          JSON.stringify({
            email: this.state.email,
            password: this.state.password
          })

      }
    )
      .then(response => {

        if (response.status !== 200) {
          var warning = document.getElementById('warning')
          warning.style.display = "block"
          warning.innerText = 'Invalid email or password'
          warning.style.color = 'red'
          throw Error
        }
        return response.json()
      }
      )
      .then(data => {
        console.log(data)
        // this.props.authenticate()
        this.setState({ authorized: true })
        // this.setState({ authorized: true })
        getUserInfo(data.name, data.entries, data.id)

      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    if (this.state.authorized) {
      console.log(this.state.authorized)
      return <Redirect to='/home' />
    }
    else {

      return (
        <Container style={{ width: "30rem", maxWidth: '80%' }}>
          <div>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={(e) => {
                this.setState({ email: e.target.value })
              }} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={(e) => {
                this.setState({ password: e.target.value })
              }} />
            </Form.Group>
            {
              <Button variant="primary" type="button" onClick={this.handleLogin}>
                Sign in
                 </Button>
            }
          </div >
          <Alert style={{ marginTop: '1rem' }} variant='info'>
            <div>
              <h5>You can register a new account</h5>
              <h5>or login using this existing one:</h5>
            </div>
            <div>
              <p style={{ marginTop: '1rem', marginBottom: 0 }}>
                Email: test@test.com
            </p>
              <p>Password: 1234</p>
            </div>

          </Alert>
        </Container >
      )
    }
  }
}
