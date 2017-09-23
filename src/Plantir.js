import React, { Component } from 'react';
import axios from 'axios';
import TileList from './TileList';
import EditTile from './EditTile';
import WelcomeHeader from './WelcomeHeader';
import DATA from './data';
import style from './style';

class Plantir extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [],
      garden: {}
    };
    this.loadTilesFromServer = this.loadTilesFromServer.bind(this);
    this.handleTokenSubmit = this.handleTokenSubmit.bind(this);
    this.handleTileSubmit = this.handleTileSubmit.bind(this);
    this.handleTileDelete = this.handleTileDelete.bind(this);
    this.handleTileUpdate = this.handleTileUpdate.bind(this);
  }
  loadTilesFromServer() {
    //if garden id has been submitted
    if (this.state.garden._id) {
      //get token
      var gardentoken = this.state.garden._id;
      axios.get('http://localhost:3001/api/garden/'+gardentoken+'/findtiles')
        .then(res => {
          this.setState({ data: res.data });
        })
      }
    //var gardenURL = 'http://localhost:3001/api/garden/59c3a401c6038385985dfd59/findtiles';
    //axios.get(this.props.url)

  }
  loadGardenFromServer() {
    var gardenURL2 = 'http://localhost:3001/api/garden/59c3a401c6038385985dfd59';
    axios.get(gardenURL2)
      .then(res => {
        this.setState({ garden: res.data });
    })
  }
  handleTileSubmit(tile) {
    let tiles = this.state.data;
    tile.id = Date.now();
    let newTiles = tiles.concat([tile]);
    this.setState({ data: newTiles});

    axios.post(this.props.url, tile)
      .then(res => {
        this.setState({ data: res });
      })
      .catch(err => {
        console.error(err);
      });
  }
  handleTileDelete(id) {
    axios.delete(`${this.props.url}/${id}`)
      .then(res => {
        console.log('Comment deleted');
      })
      .catch(err => {
        console.error(err);
      });
  }
  handleTileUpdate(id, tile) {
    //sends the comment id and new author/text to our api
    axios.put(`${this.props.url}/${id}`, tile)
      .catch(err => {
        console.log(err);
      })
  }
  handleTokenSubmit(token) {
    axios.get('http://localhost:3001/api/garden/'+token)
      .then(res => {
        this.setState({ garden: res.data });
    })
  }
  componentDidMount() {
    //this.loadGardenFromServer();
    this.loadTilesFromServer();
    setInterval(this.loadTilesFromServer, this.props.pollInterval);
  }
  render() {
    return (
      <div style={ style.commentBox }>
      <WelcomeHeader onTokenSubmit={this.handleTokenSubmit}/>
        <h2>Garden token: {this.state.garden._id}</h2>
        <p>Example garden token (for testing, copy and paste into token field, it takes a few seconds): 59c3a401c6038385985dfd59</p>
      <TileList
        onTileDelete={this.handleTileDelete} 
        onTileUpdate={this.handleTileUpdate} 
        data={ this.state.data }/>
      </div>
    )
  }
}

export default Plantir;

//      <EditTile onTileSubmit={this.handleTileSubmit} />
