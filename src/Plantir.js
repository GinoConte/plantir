import React, { Component } from 'react';
import axios from 'axios';
import TileList from './TileList';
import WeatherWidget from './WeatherWidget';
//import EditTile from './EditTile';
import WelcomeHeader from './WelcomeHeader';
import Timeline from './Timeline';
import style from './style';


class Plantir extends Component {
      //weather api
    // axios.get('http://api.openweathermap.org/data/2.5/forecast?q=Sydney&units=metric&APPID=6a99ef09a79de9a2a3fa190f2d84a2df')
    //   .then(res => {
    //     this.setState({ temp: res.data.main.temp });
    // })
    //https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/03n.png
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
      haveWeather: false,
      weatherMess: '',
      searchHtml: 'tt',
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
    this.handleMoistureFilter = this.handleMoistureFilter.bind(this);
    this.handleWaterClicked = this.handleWaterClicked.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.handleLayoutChange = this.handleLayoutChange.bind(this);
  }
  getWeather(){
    var reqStr = 'http://api.openweathermap.org/data/2.5/forecast?q='+ this.state.garden.location +'&units=metric&APPID=6a99ef09a79de9a2a3fa190f2d84a2df';
    axios.get(reqStr)
      .then(res => {
        this.setState({ weatherMess: res.data.list , haveWeather: true });
    })
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
        this.getWeather();
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
  handleWaterClicked(id) {
    let body = {lastwatered: new Date()}
    console.log("hi")
    axios.put('http://localhost:3001/api/tile/'+id, body)
      .catch(err => {
        console.log(err);
    })
  }
  componentDidMount() {
    //this.loadGardenFromServer();
    this.loadTilesFromServer();
    setInterval(this.loadTilesFromServer, this.props.pollInterval);
    //setInterval(this.handleBiologyClicked, this.props.pollInterval);
  }
  handleSearchReq(evt, id) {
      //alert('search request submitted  ' + this.state.tempVal);
      evt.preventDefault();
      this.setState({ searchRet: 's' });
            console.log(this.state.searchRet);
      axios.get('http://localhost:3001/api/search/'+this.state.tempVal)
      //axios.get('http://localhost:3001/api/search')
        .then(res =>{
          this.setState({ searchRet: res.data });
            let p = this.state.searchRet;
            console.log(p);
            // var retString = '';
            // if (Object.keys(p).length == 0){
            //   console.log("empty response!");
            //   retString = "<p>No results found!</p>";
            // } else {

            //   for (var key in p){
            //     if(p.hasOwnProperty(key)){
            //       console.log(key + "------>");
            //       let j = p[key];
            //       for(var key2 in j){
            //         if (j.hasOwnProperty(key2)){
            //             console.log(key2 + "->" + j[key2])

            //             retString = retString + "<p>" + key2 + ': '+ j[key2]  +  "</p>"

            //         }
            //       }
            //     }
            //   }
            // }
            //this.setState({searchHtml: retString});
            //this.setState({searchHtml: this.state.searchRet})
            return this.state.searchRet;
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
  handleMoistureFilter(e) {
    this.setState({filter: e.target.value});
  }
  handleLayoutChange(layouts){
    axios.put('http://localhost:3001/api/garden/' + this.state.garden._id, {
      location: this.state.garden.location,
      layout: layouts
    });
  }
  render() {

    return ( 
      <div style={ style.commentBox }>
      <center><img src="https://i.imgur.com/0LifPKw.png" width="300"></img></center>
      <center><p>Create a new garden or enter an existing token. Try: <b>59e1d08098987fc2c06dee24</b></p></center>
      <WelcomeHeader 
        onTokenSubmit={this.handleTokenSubmit}
        onCreateClicked={this.handleCreateClicked} />
      { (this.state.garden._id) ?
      <div><p><b>Accepted token:</b> {this.state.garden._id}</p>
      <p><b>Location:</b> {this.state.garden.location} </p>
      <p><b>Soil filters:</b> <input type="radio" 
                                name="filter"  
                                value="None" 
                                checked={this.state.filter === "None"}
                                onChange={this.handleNoneFilter}
                          ></input> None&nbsp;&nbsp;
                          <input  type="radio" 
                                  name="filter" 
                                  value="Sunlight" 
                                  checked={this.state.filter === "Sunlight"}
                                  onChange={this.handleSunlightFilter}
                          ></input> Sun Exposure&nbsp;&nbsp;
                          <input  type="radio" 
                                  name="filter" 
                                  value="Moisture" 
                                  checked={this.state.filter === "Moisture"}
                                  onChange={this.handleMoistureFilter}
                          ></input> Water Content&nbsp;&nbsp;</p>
      <TileList
        onTileDelete={this.handleTileDelete} 
        onTileUpdate={this.handleTileUpdate}
        onPlotUpdate={this.handlePlotUpdate} 
        onLayoutChange={this.handleLayoutChange}
        onTileTypeUpdate={this.handleTileTypeUpdate} 
        onBiologyClicked={this.handleBiologyClicked} 
        onWaterClicked={this.handleWaterClicked}
        onSearchReq={this.handleSearchReq}
        onSearchChange={this.handleSearchChange}
        data={ this.state.data }
        filterState = {this.state.filter}
        searchRet = {this.state.searchRet} 
        tiletypes={this.state.tiletypes}
        layout = {this.state.garden.layout} />
      
      <br></br>




      </div> :null }
      {  (this.state.haveWeather) ?
        <div>
          <WeatherWidget
            weatherMess={this.state.weatherMess}
            check="alalal"
          />
        </div> :null }
      </div>

      )

  }
}

export default Plantir;
/* line 249

*/
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