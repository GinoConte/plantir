import React, { Component } from 'react';
import Center from 'react-center';
import Modal from 'react-modal';
import style from './style';
import ResultIcon from './ResultIcon';
import marked from 'marked';
import ReactTooltip from 'react-tooltip'

import axios from 'axios';

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state= {
      toBeUpdated: false,
      toChangeTile: false,
      author: '',
      text: '',
      moisture: '',
      sunlight: '',
      ph: 5,
      soiltype: '',
      newtiletypename: '',
      modalIsOpen: false,
      searchRet: '',
      retString:'',
      tempVal:'',
      isResult:false,
      davesgardenplant: '',
      davesgardenph: '',
      davesgardensun: '',
      davesgardenwater: '',
      davesgardenbloom: '',
      davesgardensci: '',
    };
    //bind functions to this class
    this.deleteTile = this.deleteTile.bind(this);
    this.updateTile = this.updateTile.bind(this);
    this.changeTileType = this.changeTileType.bind(this);
    this.handleTileTypeDropdownChange = this.handleTileTypeDropdownChange.bind(this);

    this.handleSoilTypeChange = this.handleSoilTypeChange.bind(this);
    this.handlePHChange = this.handlePHChange.bind(this);
    this.handleMoistureChange = this.handleMoistureChange.bind(this);
    this.handleSunlightChange = this.handleSunlightChange.bind(this);

    //this.handleTileUpdate = this.handleTileUpdate.bind(this);
    this.handlePlotUpdate = this.handlePlotUpdate.bind(this);
    this.handleTileTypeUpdate = this.handleTileTypeUpdate.bind(this);
    this.handleBiologyClicked = this.handleBiologyClicked.bind(this);
    this.handleWaterClicked = this.handleWaterClicked.bind(this);
    this.handleResultClicked = this.handleResultClicked.bind(this);

    this.handleSearchReq = this.handleSearchReq.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleParseSearch = this.handleParseSearch.bind(this);
    this.findPlantFromId = this.findPlantFromId.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.appendTileNum = this.appendTileNum.bind(this);




  }
  updateTile(e) {
    e.preventDefault();
    //set update flag in the state
    this.setState({ toBeUpdated: !this.state.toBeUpdated });
  }
  changeTileType(e) {
  //changeTileType(){
    e.preventDefault();
    this.setState({ toChangeTile: !this.state.toChangeTile });
  }
  handlePlotUpdate(e) {
    e.preventDefault();
    //console.log(this.props.uniqueID);
    let id = this.props.uniqueID;
    let moisture = (this.state.moisture) ? this.state.moisture : null;
    let sunlight = (this.state.sunlight) ? this.state.sunlight : null;
    let soiltype = (this.state.soiltype) ? this.state.soiltype : null;
    let ph = (this.state.ph) ? this.state.ph : null;
    let plot = {
      moisture: moisture,
      sunlight: sunlight,
      ph: ph,
      soiltype: soiltype,
    }
    this.props.onPlotUpdate(id, plot);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      moisture: '',
      sunlight: '',
      soiltype: '',
      ph: 5,
    })
  }
  handleTileTypeUpdate(e) {
    e.preventDefault();
    let tileId = this.props.uniqueID;
    let newTileTypeName = this.state.newtiletypename;
    this.props.onTileTypeUpdate(tileId, newTileTypeName);
    this.setState({
      toChangeTile: false,
      newtiletypename: '',
    })

  }
  handleBiologyClicked(e) {
    e.preventDefault();
    //let tileid = this.props.uniqueID;
    let name = this.props.tiletypename;
    this.props.onBiologyClicked(name);
  }
  handleWaterClicked(e) {
    e.preventDefault();
    this.props.onWaterClicked(this.props.uniqueID);
  }
  deleteTile(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onTileDelete(id);
    console.log('Tile deleted');
  }
  handleSoilTypeChange(e) {
    this.setState({soiltype: e.target.value});
  }
  handleMoistureChange(e) {
    this.setState({moisture: e.target.value});
  }
  handleSunlightChange(e) {
    this.setState({sunlight: e.target.value});
  }
  handlePHChange(e) {
    this.setState({ph: e.target.value});
  }
  handleTileTypeDropdownChange(e) {
    this.setState({newtiletypename: e.target.value});
  }
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({isResult: false});
    this.setState({modalIsOpen: false});
  }
  appendTileNum(str){
    return str + this.props.gridorder.toString();
  }

  handleSearchChange(e){
    e.preventDefault();
    this.setState({tempVal: e.target.value});
  }
  handleSearchReq(evt){
    //e.preventDefault();
    this.setState({isResult:false});
    // this.props.onSearchReq(e,this.props.uniqueID);
    // this.setState({retString: ''});
    // console.log("?");

    evt.preventDefault();
      this.setState({ searchRet: 's' });
            console.log(this.state.searchRet);
      axios.get('http://localhost:3001/api/search/'+this.state.tempVal)
      //axios.get('http://localhost:3001/api/search')
        .then(res =>{
          this.setState({ searchRet: res.data });
            let p = this.state.searchRet;
            console.log(p);
            this.handleParseSearch();
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
            })
            //this.setState({searchHtml: retString});
            //this.setState({searchHtml: this.state.searchRet})


  }
  handleParseSearch(){
    var p = this.state.searchRet;
    console.log(Object.keys(p).length);
    var retString = '';
    if (Object.keys(p).length == 0){
      console.log("empty response!");
      retString = "<p>No results found!</p>";
    } else {

      for (var key in p){
        if(p.hasOwnProperty(key)){
          console.log(key + "------>");
          let j = p[key];
          for(var key2 in j){
            if (j.hasOwnProperty(key2)){
                console.log(key2 + "->" + j[key2])

                retString = retString + "<p>" + key2 + ': '+ j[key2]  +  "</p>"

            }
          }
        }
      }
    }
    this.setState({retString: retString});
    this.setState({isResult: true});

  }
  handleResultClicked(dgId, imglink){
    //e.preventDefault();
    //this.setState({isResult:false});\

    //we need to change the davesgardenid of the tile
    let tileId = this.props.uniqueID;
    let tempTile = {
      davesgardenid: dgId,
      imglink: imglink,
    }
    this.props.onPlotUpdate(tileId, tempTile);

    //and we need to change the tiletype of the tile to "other plant"
    this.props.onTileTypeUpdate(tileId, "Other plant");
    this.setState({davesgardenplant: ''});

  }
  findPlantFromId(dgId){
    axios.get('http://localhost:3001/api/search/'+dgId)
      .then(res =>{
        //set name (only take first couple words)
        let plantname = res.data.name;
        let regex = /^([A-Za-z0-9\s]+),.*/g;
        let match = regex.exec(plantname);
        this.setState({ davesgardenplant: match[1] });
        let p = this.state.davesgardenplant;
        console.log(p);

        //set ph
        let ph = res.data['Soil pH requirements'];
        this.setState({ davesgardenph: ph });

        //set bloom time
        let bloom = res.data['Bloom Time'];
        this.setState({ davesgardenbloom: bloom });

        //set scientific name
        let sci = res.data['scientific'];
        this.setState({ davesgardensci: sci });

        //set watering
        let water = res.data['Water Requirements'];
        this.setState({ davesgardenwater: water });

          //this.handleParseSearch();
    })
  }




  render() {

    //check if tiletype is davesgarden plant or default tiletype
    if (this.state.davesgardenplant === '') {
          var tileName = this.props.tiletypename;
    } else {
      var tileName = this.state.davesgardenplant;
    }
    if (this.props.davesgardenid == -1) {
      //custom plant
      if (!(this.state.davesgardenplant === this.props.tiletypename)) {
              this.setState({davesgardenplant: this.props.tiletypename});
      }
    } else {
      if (this.state.davesgardenplant === '') {
        this.findPlantFromId(this.props.davesgardenid);
        //this.setState({davesgardenplant: 'nope'})
        //console.log(this.props.tiletypename);
        tileName = this.state.davesgardenplant;
        console.log(tileName);
      }
    }


    var contents = "Change Tile";
    // if( this.state.retString == ''){
    //   this.handleParseSearch();
    // }
    if (this.props.tiletypeisplant) {
      //contents = "Biology"
    }

    var flowerImages = {};
    flowerImages["Other plant"] = "https://p.memecdn.com/avatars/s_15452_506ee39357ccf.jpg";
    flowerImages["Sunflower"] = "https://pbs.twimg.com/profile_images/639501065210105860/BntxzORs.jpg";
    flowerImages["Daisy"] = "https://68.media.tumblr.com/avatar_d6bca09754c0_128.png";
    flowerImages["Rose"] = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Rose_Ingrid_Bergmann.jpg/256px-Rose_Ingrid_Bergmann.jpg";
    flowerImages["nothing"] = "https://p.memecdn.com/avatars/s_15452_506ee39357ccf.jpg"

    var flowerInfo = {};
    flowerInfo["Other plant"] = "Violet Information";
    flowerInfo["Sunflower"] = "Sunflower Information";
    flowerInfo["Daisy"] = "Daisy Information"; 
    flowerInfo["Rose"] = "Rose Information";

    var flowerSunInfo = {};
    flowerSunInfo["Other plant"] = "Required Sun Exposure: Full Sun";
    flowerSunInfo["Sunflower"] = "Required Sun Exposure: Full Sun";
    flowerSunInfo["Daisy"] = "Required Sun Exposure: Sun to Partial Shade";  
    flowerSunInfo["Rose"] = "Required Sun Exposure: Full Sun";

    var flowerMoistureInfo = {};
    flowerMoistureInfo["Other plant"] = "Water Requirements: Average Water Needs; Water regularly; do not overwater";
    flowerMoistureInfo["Sunflower"] = "Water Requirements: Average Water Needs; Water regularly; do not overwater";
    flowerMoistureInfo["Daisy"] = "Water Requirements: Average Water Needs; Water regularly; do not overwater";  
    flowerMoistureInfo["Rose"] = "Water Requirements: Average Water Needs; Water regularly; do not overwater";

    var flowerPHInfo = {};
    flowerPHInfo["Other plant"] = "Soil pH requirements: 6.6 to 7.5 (neutral)";
    flowerPHInfo["Sunflower"] = "Soil pH requirements: 6.6 to 7.5 (neutral)";
    flowerPHInfo["Daisy"] = "Soil pH requirements: 6.6 to 7.5 (neutral)";
    flowerPHInfo["Rose"] = "Soil pH requirements: 6.1 to 6.5 (mildly acidic)";


    var tileColour = this.props.tiletypecolour;
    //get filter colours
    if (this.props.filterState === "Sunlight") {
      if (this.props.tileprops.sunlight === "Moderate") {
        tileColour = '#ffdf00';
      }
      if (this.props.tileprops.sunlight === "None") {
        tileColour = '#8d90ff';
      }
      if (this.props.tileprops.sunlight === "Low") {
        tileColour = '#ffff80';
      }
      if (this.props.tileprops.sunlight === "High") {
        tileColour = '#ff6000';
      }
    }
    if (this.props.filterState === "Moisture") {
      if (this.props.tileprops.moisture === "None") {
        tileColour = '#d9eafd';
      }
      if (this.props.tileprops.moisture === "Low") {
        tileColour = '#5aaee1';
      }
      if (this.props.tileprops.moisture === "Moderate") {
        tileColour = '#1e8acb';
      }
      if (this.props.tileprops.moisture === "High") {
        tileColour = '#00608b';
      }
      if (this.props.tileprops.moisture === "Drenched") {
        tileColour = '#003b56';
      }
    }
//{this.props.gridorder} 
    return (
      <div style={Object.assign(style.tile, {backgroundColor: tileColour})}>
        <center><b>&nbsp;{this.state.davesgardenplant}&nbsp;&nbsp;</b>
          { (this.props.tiletypeisplant) ?
          (<button
            style={style.emptybutton}
            onClick={this.handleWaterClicked}
            value='Water'>
          <img src="https://i.imgur.com/9KRykNG.png" width="25"></img>
          </button>) : null
          }
        </center>
        { (this.props.tiletypeisplant && (this.props.filterState === "None")) 
        ? (<center><img src={this.props.imglink} width="800" style={ style.images }  onClick={this.handleBiologyClicked} data-tip data-for={this.appendTileNum("tooltip")}/>
          <ReactTooltip id={this.appendTileNum("tooltip")}>
            <p><b>{this.state.davesgardenplant}</b></p>
            <p><i>{this.state.davesgardensci}</i></p>
            <p>pH Requirements: {this.state.davesgardenph}</p>
            <p>Watering frequency: {this.state.davesgardenwater}</p>
            <p>Sunlight needs: {this.state.davesgardensun}</p>
            <p>Bloom time: {this.state.davesgardenbloom}</p>
            <p>Last watered: {this.props.lastwatered}</p>
          </ReactTooltip>
          </center>
        ) : 
        (<center><img src={flowerImages["nothing"]} style={ style.invisibleImage } /></center>) }
        
        <center><button 
                  style={ style.tilebutton } 
                  onClick={this.openModal}
                  value='Plot'>
                  Edit
                </button>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Tile Information Modal"
          style={ style }
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Plot Information</h2>
          <div style={ style.tilebox }>
            <div style={ style.comment }>
              <p><b>Properties:</b></p>
              <ul>
                <li>Soil type: {this.props.tileprops.soiltype}</li>
                <li>Moisture: {this.props.tileprops.moisture}</li>
                <li>Sunlight: {this.props.tileprops.sunlight}</li>
                <li>pH balance: {this.props.tileprops.ph}</li>
                <li>Last watered: {this.props.lastwatered.toString()}</li>
                <li>Ds G ID: {this.props.davesgardenid}</li>
              </ul>
              <a style={ style.updateLink } href='#' onClick={ this.updateTile }>Update</a>
              <a style={ style.deleteLink } href='#' onClick={ this.deleteTile }>Delete</a>
              <a style={ style.updateLink } href='#' onClick={ this.changeTileType }>Type</a>
              { (this.state.toBeUpdated)
                ? (<form onSubmit={ this.handlePlotUpdate }>
                    <select name="soiltype" onChange={this.handleSoilTypeChange}>
                      <option value="Select" selected>Soil Type</option>
                      <option value="Loam">Loam</option>
                      <option value="Sandy">Sandy</option>
                      <option value="Clay">Clay</option>
                      <option value="Silty">Silty</option>
                      <option value="Peaty">Peaty</option>
                    </select>
                    <select name="sunlight" onChange={this.handleSunlightChange}>
                      <option value="Select" selected>Sunlight</option>
                      <option value="None">None</option>
                      <option value="Low">Low</option>
                      <option value="Moderate">Moderate</option>
                      <option value="High">High</option>
                    </select>
                    <select name="moisture" onChange={this.handleMoistureChange}>
                      <option value="Select" selected>Moisture</option>
                      <option value="None">None</option>
                      <option value="Low">Low</option>
                      <option value="Moderate">Moderate</option>
                      <option value="High">High</option>
                      <option value="Drenched">Drenched</option>
                    </select>
                    <select name="ph" onChange={this.handlePHChange}>
                      <option value="Select" selected>pH</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                    </select>
                    <input
                      type='submit'
                      style={ style.commentFormPost }
                      value='Update' />
                  </form>)
                : null}
                <div>
                      { (this.state.toChangeTile && this.props.tiletypeisplant)
           ? (<form onSubmit={ this.handleTileTypeUpdate }>
                  <select name="selectedtype" onChange={this.handleTileTypeDropdownChange}>
                    <option value="Select" selected>Tile</option>
                    <option value="Grass">Grass</option>
                    <option value="House">House</option>
                    <option value="Path">Path</option>
                  </select>
                  <input
                    type='submit'
                    style={ style.commentFormPost }
                    value='Change' 
                  />
                </form>): null}

          { (this.state.toChangeTile && !this.props.tiletypeisplant)
           ? (<form onSubmit={ this.handleTileTypeUpdate }>
                  <select name="selectedtype" onChange={this.handleTileTypeDropdownChange}>
                    <option value="Select" selected>Tile</option>
                    <option value="Grass">Grass</option>
                    <option value="House">House</option>
                    <option value="Path">Path</option>
                    <option value="Sunflower">Sunflower</option>
                    <option value="Daisy">Daisy</option>
                    <option value="Rose">Rose</option>
                    <option value="Violet">Violet</option>
                  </select>
                  <input
                    type='submit'
                    style={ style.commentFormPost }
                    value='Change' 
                  />
                </form>): null}
                </div>
            </div>

        </div>
        <Center>
          <br></br>
          <form>

          <input
            type='text'
            placeholder='search me!'
            style={ style.searchFormText}
            value={ this.state.tempVal }
            onChange={this.handleSearchChange} />

          <button
            style={ style.commentFormPost }
            value='submit no refresh' 
            onClick={ this.handleSearchReq } 
            > search
          </button>
          <button onClick={this.closeModal} style={ style.commentFormPost }>Close</button>

          </form>
        </Center>


          { (this.state.isResult)
            ? <ResultIcon
            results={this.state.searchRet}
            onResultClicked={this.handleResultClicked}>
          </ResultIcon>:null}
        </Modal>
        </center>


      </div>
    )
  }
}

export default Tile;

/*

        <button 
          style={ style.tilebutton } 
          onClick={this.changeTileType}
          value='Contents'>
          {contents}
        </button></center>
*/

//line 247:
//<li>Tile ID: {this.props.uniqueID}</li>