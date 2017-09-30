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
      data: [], //i.e the Tiles belonging to a garden
      tiletypes: [],
      garden: {} //the Garden object, includes location, id, etc
    };
    this.loadTilesFromServer = this.loadTilesFromServer.bind(this);
    this.loadTileTypesFromServer = this.loadTileTypesFromServer.bind(this);
    this.handleCreateClicked = this.handleCreateClicked.bind(this);    
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
          this.setState({ data: res.data },
            function() {
              this.loadTileTypesFromServer();
            })
        })
      }
    //var gardenURL = 'http://localhost:3001/api/garden/59c3a401c6038385985dfd59/findtiles';
    //axios.get(this.props.url)

  }
  //*** not sure if this is the best way to do it,
  //    but it works by loading all needed tiletypes
  //    into an array and we can match that to tiles'
  //    tiletype_id later - Gino
  loadTileTypesFromServer() {
    if (this.state.garden._id) {
      //assume we have a valid garden at this point?
      var neededTileTypes = this.state.tiletypes.slice();
      //loop through all tiles
      //console.log(this.state.data);
      for(var i=0;i<this.state.data.length;i++) {
        //create a list of needed tiles?
        var currentid = this.state.data[i].tiletype;
        //retrieve tiletype from db
        axios.get('http://localhost:3001/api/tiletype/'+currentid)
          .then(res => {
              //console.log(res.data);
              if(!neededTileTypes.includes(res.data)) {
                neededTileTypes.push(res.data);
              }
          })
      }
      //console.log(neededTileTypes)
      //console.log(this.state.tiletypes)
      this.setState({ tiletypes: neededTileTypes})
    }

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
  handlePlotUpdate(id, plot) {
    if (plot.ph === "Select") {
      plot.ph = '';
    }
    if (plot.moisture === "Select") {
      plot.moisture = '';
    }
    if (plot.sunlight === "Select") {
      plot.sunlight = '';
    }
    if (plot.soiltype === "Select") {
      plot.soiltype = '';
    }
    axios.put('http://localhost:3001/api/tile/'+id, plot)
      .catch(err => {
        console.log(err);
    })
  }
  handleTokenSubmit(token) {
    //token has been given
    axios.get('http://localhost:3001/api/garden/'+token)
      .then(res => {
        this.setState({ garden: res.data });
        //this.loadTileTypesFromServer();

    })
  }
  handleCreateClicked() {
    axios.post('http://localhost:3001/api/garden')
      .then(res => {
        var newID = res.data.gardenid;
        //get new garden object
        this.handleTokenSubmit(newID);
        //this.setState({ garden: res.data });
    })
  }
  componentDidMount() {
    //this.loadGardenFromServer();
    this.loadTilesFromServer();
    setInterval(this.loadTilesFromServer, this.props.pollInterval);
    //setInterval(this.loadTileTypesFromServer, this.props.pollInterval);

  }
  render() {
    return ( 
      <div style={ style.commentBox }>
      <WelcomeHeader 
        onTokenSubmit={this.handleTokenSubmit}
        onCreateClicked={this.handleCreateClicked} />
      <p>Example token: 59cf38f50f739a46a9121d1d</p>
      <h3><b>Garden token: {this.state.garden._id}</b></h3>
      <h4>Location: {this.state.garden.location}</h4>
      <TileList
        onTileDelete={this.handleTileDelete} 
        onTileUpdate={this.handleTileUpdate}
        onPlotUpdate={this.handlePlotUpdate} 
        data={ this.state.data }
        tiletypes={this.state.tiletypes} />
      </div>
    )
  }
}

export default Plantir;

//      <EditTile onTileSubmit={this.handleTileSubmit} />
