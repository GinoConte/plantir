
import React, { Component } from 'react';
import Center from 'react-center';
import Modal from 'react-modal';
import style from './style';
import marked from 'marked';

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

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
    this.setState({modalIsOpen: false});
  }


  render() {
    //check if tile is plant or not
    var contents = "Change Tile";
    if (this.props.tiletypeisplant) {
      //contents = "Biology"
    }

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

    return (
      <div style={Object.assign(style.tile, {backgroundColor: tileColour})}>
        <center><b>&nbsp;{this.props.gridorder} {this.props.tiletypename}</b></center>
        <br></br>
        { (this.props.tiletypeisplant) 
        ? (<center><button 
          style={ style.biologybutton } 
          onClick={this.handleBiologyClicked}
          value='Biology'>
          Biology
        </button><br></br></center>) : (<div><br></br><br></br></div>)
        }



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
                <li>Tile ID: {this.props.uniqueID}</li>
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
                      <option value="Waterlogged">Drenched</option>
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
          <button onClick={this.closeModal}>Close</button>
        </Center>
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