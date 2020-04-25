import React from 'react';
import './App.css';

import ImageUrl from '../ImageUrl/ImageUrl'
import Rank from '../Rank/Rank'
import OutputImage from '../OutputImage/OutputImage'
import Particles from 'react-particles-js';
import detect_faces from '../Api/ClarifaiApi/ClarifaiApi'
import NavBar from '../NavBar/NavBar';
import Register from '../Register/Register'
import Login from '../Login/Login'

import { Route, BrowserRouter } from "react-router-dom";

const initialState = {
  input: '',
  imageUrl: '',
  regions: [],
  ready: false,
  name: '',
  rank: 0,
  id: 0,
  authenticated: false
}

class App extends React.Component {
  constructor() {
    super()
    this.state = initialState
  }

  onInputChange = (event) => {
    console.log(event.target.value)
    this.setState({ input: event.target.value })
  }

  resetState = () => {
    this.setState(initialState)
  }
  onButtonSubmit = (event) => {
    
    fetch('https://radiant-peak-65277.herokuapp.com/image',
    {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.state.id
      })
    }
    )
    .then(response => response.json())
    .then(entries => this.setState({rank: entries}))
    .catch(err => console.log(err))

    this.setState({ imageUrl: this.state.input, ready: false })
    detect_faces(this.state.input)
      .then(response => {
        this.setState({ regions: response.outputs[0].data.regions, ready: true })
      })
      .catch(err => console.log('error'))
  }

  getUserInfo = (name,rank,id) => {
    this.setState({name: name , rank: rank, id: id})
  }

  authenticate = () => {
    this.setState({authenticated: true})
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Particles params={{
            "particles": {
              "number": {
                "value": 50
              },
              "density": {
                enable: true,
                value_area: 800
              }
            }
          }} className="particles" />

          <Route exact path="/">
            <NavBar resetState={this.resetState}/>
            <Login getUserInfo={this.getUserInfo} authenticate = {this.authenticate}/>
            <div id="warning">enter byanatak y hamada</div>
          </Route>
          <Route path="/register">
            <NavBar resetState={this.resetState}/>
            <Register getUserInfo={this.getUserInfo}/>
          </Route>
          <Route path="/home">

            <NavBar resetState={this.resetState}/>
            <Rank name={this.state.name} rank={this.state.rank}/>
            <ImageUrl
              onButtonSubmit={this.onButtonSubmit}
              onInputChange={this.onInputChange}
            />
            <OutputImage ready={this.state.ready} regions={this.state.regions} imageUrl={this.state.imageUrl} />
             
          
          </Route>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
