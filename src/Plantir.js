import React, { Component } from 'react';
import axios from 'axios';
import TileList from './TileList';
//import EditTile from './EditTile';
import WelcomeHeader from './WelcomeHeader';
import style from './style';

class Plantir extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [], //i.e the Tiles belonging to a garden
      tiletypes: [],
      garden: {}, //the Garden object, includes location, id, etc
      temp: 25.1,

      tempVal: 'oi',
      searchRet: '43534',
      currentBiology: 'Biological Information',
      filter: 'None',
    };
    this.loadTilesFromServer = this.loadTilesFromServer.bind(this);
    this.loadTileTypesFromServer = this.loadTileTypesFromServer.bind(this);
    this.handleCreateClicked = this.handleCreateClicked.bind(this);    
    this.handleTokenSubmit = this.handleTokenSubmit.bind(this);
    this.handleTileSubmit = this.handleTileSubmit.bind(this);
    this.handleTileDelete = this.handleTileDelete.bind(this);
    this.handleTileUpdate = this.handleTileUpdate.bind(this);
    this.handleTileTypeUpdate = this.handleTileTypeUpdate.bind(this);
    this.handleBiologyClicked = this.handleBiologyClicked.bind(this);
    this.handleSearchReq = this.handleSearchReq.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleNoneFilter = this.handleNoneFilter.bind(this);
    this.handleSunlightFilter = this.handleSunlightFilter.bind(this);
  }
  loadTilesFromServer() {
    //if garden id has been submitted
    //console.log(this.state.currentBiology.usage)
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
  // update: THIS MADE IT SLOW :'( BAD IDEA
  loadTileTypesFromServer() {
    // if (this.state.garden._id) {
    //   //assume we have a valid garden at this point?
    //   var neededTileTypes = this.state.tiletypes.slice();
    //   //loop through all tiles
    //   //console.log(this.state.data);
    //   for(var i=0;i<this.state.data.length;i++) {
    //     //create a list of needed tiles?
    //     var currentid = this.state.data[i].tiletype;
    //     //retrieve tiletype from db
    //     axios.get('http://localhost:3001/api/tiletype/'+currentid)
    //       .then(res => {
    //           //console.log(res.data);
    //           if(!neededTileTypes.includes(res.data)) {
    //             neededTileTypes.push(res.data);
    //           }
    //       })
    //   }
    //   //console.log(neededTileTypes)
    //   //console.log(this.state.tiletypes)
    //   this.setState({ tiletypes: neededTileTypes})
    // }
    axios.get('http://localhost:3001/api/tiletype/')
      .then(res => {
        //console.log(res.data);
        this.setState({tiletypes: res.data})
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
  handleTileTypeUpdate(tileid, tiletypename) {
    axios.get('http://localhost:3001/api/tiletype/name/'+tiletypename)
      .then(res => {
        var tiletypeid = res.data._id;
        var body = {tiletype: tiletypeid};

      axios.put('http://localhost:3001/api/tile/'+tileid, body)
        .catch(err => {
        console.log(err);
      })
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
  handleBiologyClicked(name) {
    axios.get('http://localhost:3001/api/search/'+name)
    //axios.get('http://localhost:3001/api/search')
      .then(res =>{
        this.setState({ currentBiology: res.data });
        //console.log(this.state.searchRet);
      })
  }
  componentDidMount() {
    //this.loadGardenFromServer();
    this.loadTilesFromServer();
    setInterval(this.loadTilesFromServer, this.props.pollInterval);
    //setInterval(this.handleBiologyClicked, this.props.pollInterval);
  }
  handleSearchReq(evt) {
      //alert('search request submitted  ' + this.state.tempVal);
      evt.preventDefault();
      this.setState({ searchRet: 's' });
            console.log(this.state.searchRet);
      axios.get('http://localhost:3001/api/search/'+this.state.tempVal)
      //axios.get('http://localhost:3001/api/search')
        .then(res =>{
          this.setState({ searchRet: res.data });
            console.log(this.state.searchRet);
        })
  }
  handleSearchChange(evt){
    this.setState({tempVal: evt.target.value});
  }
  handleNoneFilter(e) {
    this.setState({filter: e.target.value});
  }
  handleSunlightFilter(e) {
    this.setState({filter: e.target.value});
  }
  render() {
    //weather api
    // axios.get('api.openweathermap.org/data/2.5/weather?q=Sydney&APPID=6a99ef09a79de9a2a3fa190f2d84a2df')
    //   .then(res => {
    //     this.setState({ temp: res.data.main.temp });
    // })
    return ( 
      <div style={ style.commentBox }>
      <center><img src="https://i.imgur.com/0LifPKw.png" width="300"></img></center>
      <center><p>Create a new garden or enter an existing token. Try: <b>59cf38f50f739a46a9121d1d</b></p></center>
      <WelcomeHeader 
        onTokenSubmit={this.handleTokenSubmit}
        onCreateClicked={this.handleCreateClicked} />
      { (this.state.garden._id) ?
      <div><p><b>Accepted token:</b> {this.state.garden._id}</p>
      <p><b>Location:</b> {this.state.garden.location} </p>
      <p><b>Filters:</b> <input type="radio" 
                                name="filter"  
                                value="None" 
                                checked={this.state.filter === "None"}
                                onChange={this.handleNoneFilter}
                          ></input> None
                          <input  type="radio" 
                                  name="filter" 
                                  value="Sunlight" 
                                  checked={this.state.filter === "Sunlight"}
                                  onChange={this.handleSunlightFilter}
                          ></input> Sun Exposure</p>
      <TileList
        onTileDelete={this.handleTileDelete} 
        onTileUpdate={this.handleTileUpdate}
        onPlotUpdate={this.handlePlotUpdate} 
        onTileTypeUpdate={this.handleTileTypeUpdate} 
        onBiologyClicked={this.handleBiologyClicked} 
        data={ this.state.data }
        filterState = {this.state.filter} 
        tiletypes={this.state.tiletypes} />
      
      <br></br>
      <center>
        <textarea rows="4" cols="90"
          value={JSON.stringify(this.state.currentBiology)}>
        </textarea>
      </center>

      </div> :null }



      </div>
      )

  }
}

export default Plantir;

//      <EditTile onTileSubmit={this.handleTileSubmit} />
        // <form style={ style.commentForm }>
        //   <button
        //   style={ style.commentFormPost }
        //   value='submit no refresh' 
        //   onClick={ this.handleSearchReq } >search</button>
        //   <input
        //     type='text'
        //     placeholder='search me!'
        //     style={ style.commentFormText}
        //     value={ this.state.tempVal }
        //     onChange={this.handleSearchChange} />

        // </form>
        // <p> results currently printed in console </p>
        // <p>  </p>