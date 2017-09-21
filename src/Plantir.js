import React, { Component } from 'react';
import axios from 'axios';
import TileList from './TileList';
import EditTile from './EditTile';
import DATA from './data';
import style from './style';

class Plantir extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadTilesFromServer = this.loadTilesFromServer.bind(this);
    this.handleTileSubmit = this.handleTileSubmit.bind(this);
    this.handleTileDelete = this.handleTileDelete.bind(this);
    this.handleTileUpdate = this.handleTileUpdate.bind(this);
  }
  loadTilesFromServer() {
    var gardenURL = 'http://localhost:3001/api/garden/59c3a401c6038385985dfd59/findtiles';
    //axios.get(this.props.url)
    axios.get(gardenURL)
      .then(res => {
        this.setState({ data: res.data });
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
  componentDidMount() {
    this.loadTilesFromServer();
    setInterval(this.loadTilesFromServer, this.props.pollInterval);
  }
  render() {
    return (
      <div style={ style.commentBox }>
        <h2>Gardens created:</h2>
      <TileList
        onTileDelete={this.handleTileDelete} 
        onTileUpdate={this.handleTileUpdate} 
        data={ this.state.data }/>
      <EditTile onTileSubmit={this.handleTileSubmit} />
      <hr></hr>

      </div>
    )
  }
}

export default Plantir;