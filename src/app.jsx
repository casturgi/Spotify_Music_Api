import React, {Component} from 'react';
import './App.css';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './gallery';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: null
    }
  }

  search() {

    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer BQBWet4aSx5vrowpHphnSnsOBcUdQfi9COXB9GLQ6qzHc0STBIeWbXmSqWa7qq2wF3ESVloqTjYBf6dAxyDp__2FRAjY89Bh6ku01ZtqhU8Yac4y_0o7FYS7PAyZJYhk6RLuewsynrQAnCfrqCCT83j-CmJUsVpGba-dFJawycpYeGMdnA&refresh_token=AQD1y3Okiqw_K8TrMRCgok-j5SyRMxDG4CH-3F2HXdvncGZFSgvkms_cddGuG3hTNNvJxhwcVwWdDovyNWvd5noN1HSjOMJWYcZquo-5GBKO0ppHL5ZN-wjKNeXgQkzl3GA");

    fetch(FETCH_URL, {
      method: 'GET',
      headers: myHeaders,
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      const artist = json.artists.items[0];
      this.setState({artist});

      const FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
      fetch(FETCH_URL, {
        method: 'GET',
        headers: myHeaders
      })
      .then(response => response.json())
      .then(json => {
        console.log('artist\'s top tracks', json);
        const { tracks } = json;
        this.setState({tracks});
      })
    });

  }

  render() {
    return (
      <div className="App">
        <div className="App-title">Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              value={this.state.query}
              placeholder="Search for an artist..."
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                if(event.key === 'Enter') {
                  this.search();
                }
              }}
              />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null
          ?
          <div>
            <Profile
              artist={this.state.artist}
              />
            <Gallery
              tracks={this.state.tracks}
            />
          </div>
          :
          <div></div>
        }
      </div>
    )
  }

}

export default App;
