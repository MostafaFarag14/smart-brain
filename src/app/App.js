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
import ImageUploader from '../ImageUploader/ImageUploader';

const initialState = {
  input: '',
  imageUrl: '',
  regions: [],
  ready: false,
  name: '',
  rank: 0,
  id: 0,
  authenticated: false,
  loading: false
}

class App extends React.Component {
  constructor() {
    super()
    this.state = initialState
  }

  componentWillMount() {
    fetch('https://radiant-peak-65277.herokuapp.com/',
      {
        method: 'get',
        headers: {
          "Content-Type": "application/json"
        }
      })
  }

  onInputChange = (event) => {
    console.log(event.target.value)
    this.setState({ input: event.target.value })
  }

  setLoading = () => {
    this.setState({ loading: true })
  }
  onFileSubmit = (imageURL) => {
    this.setState({ input: imageURL }, () => {
      this.onButtonSubmit()
    })
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
      .then(entries => this.setState({ rank: entries }))
      .catch(err => console.log(err))

    this.setState({ imageUrl: this.state.input, ready: false })
    detect_faces(this.state.input)
      .then(response => {
        this.setState({ regions: response.outputs[0].data.regions, ready: true, loading: false })
      })
      .catch(err => console.log('error'))
  }

  getUserInfo = (name, rank, id) => {
    this.setState({ name: name, rank: rank, id: id })
  }

  authenticate = () => {
    this.setState({ authenticated: true })
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
            <NavBar resetState={this.resetState} />
            <Login getUserInfo={this.getUserInfo} authenticate={this.authenticate} />
            <div style={{ display: 'none' }} id="warning">enter byanatak y hamada</div>
          </Route>
          <Route path="/register">
            <NavBar resetState={this.resetState} />
            <Register getUserInfo={this.getUserInfo} />
          </Route>
          <Route path="/home">

            <NavBar resetState={this.resetState} />
            <Rank name={this.state.name} rank={this.state.rank} />
            <ImageUrl
              onButtonSubmit={this.onButtonSubmit}
              onInputChange={this.onInputChange}
            />
            OR
            <ImageUploader onFileSubmit={this.onFileSubmit} setLoading={this.setLoading}/>
            {this.state.loading && <h4 style={{margin: '1rem'}}>Loading...</h4>}
            {
              !this.state.loading &&
              <OutputImage ready={this.state.ready} regions={this.state.regions} imageUrl={this.state.imageUrl} />
            }


          </Route>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
