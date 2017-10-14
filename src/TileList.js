import React, { Component } from 'react';
import Tile from './Tile';
import style from './style';
import Checkbox from './Checkbox';

//import { Container, Row, Col } from 'reactstrap';

    //not sure how to set the whole tileNodes into items as label for checkbox dynamically 
    //eg according to its length

    const items = ['0','1','2','3','4','5',
                  '6','7','8','9','10','11',
                  '12','13','14','15','16','17',
                  '18','19','20','21','22','23',
                  '24',];


class TileList extends Component {
    //-----------checkbox stuff here------//

    componentWillMount = () => {
      this.selectedCheckboxes = new Set();
    }

    toggleCheckbox = label => {
      if (this.selectedCheckboxes.has(label)) {
        this.selectedCheckboxes.delete(label);
      } else {
        this.selectedCheckboxes.add(label);
      }
    }

    handleFormSubmit = formSubmitEvent => {
      formSubmitEvent.preventDefault();

      for (const checkbox of this.selectedCheckboxes) {
        console.log(checkbox, 'is selected.');
      }
    }

    createCheckbox = label => (
      <Checkbox 
              label={label}
              handleCheckboxChange={this.toggleCheckbox}
              key={label} />
    )

    createCheckboxes = () => (
      items.map(this.createCheckbox)
    )

    //------------------------------



  render() {
    var test="nope";
    if(this.props.tiletypes.length > 0) {
      test = "ho";
    }

    //match tiletype id
    var tiles = this.props.data.slice();

    //sort into ascending grid order
    tiles.sort(function(a,b) {
      return parseInt(a.gridorder) - parseInt(b.gridorder);
    })


    var tiletypes = this.props.tiletypes.slice();
    for(var i=0; i<tiles.length; i++) {
      var currentTileTypeID = tiles[i].tiletype;
      //console.log(currentTileTypeID);
      for(var j=0; j<tiletypes.length; j++) {
        //console.log(tiletypes[j].name);
        if(currentTileTypeID === tiletypes[j]._id) {
          tiles[i].tiletypename = tiletypes[j].name;
          tiles[i].tiletypecolour = tiletypes[j].tilecolour;
          tiles[i].tiletypeisplant = tiletypes[j].isplant;
          tiles[i].tiletypeinfo = tiletypes[j].info;
        }
      }
    }

    //let tileNodes = this.props.data.map(tile => {
    let tileNodes = tiles.map(tile => {
      return (
        <Tile
          uniqueID={tile['_id']} 
          key={tile['_id']} 
          onTileDelete={this.props.onTileDelete} 
          onPlotUpdate={this.props.onPlotUpdate} 
          onTileUpdate={this.props.onTileUpdate}  
          onBiologyClicked={this.props.onBiologyClicked} 
          onTileTypeUpdate={this.props.onTileTypeUpdate} 
          onSearchReq={this.props.onSearchReq}
          onSearchChange={this.props.onSearchChange}
          onWaterClicked={this.props.onWaterClicked}
          searchRet={this.props.searchRet} 
          filterState={this.props.filterState}  
          parentgarden={tile.parentgarden} 
          tileprops={tile.tileprops}
          gridorder={tile.gridorder} 
          lastwatered={tile.lastwatered} 
          davesgardenid={tile.davesgardenid}
          imglink={tile.imglink} 
          tiletypename={tile['tiletypename']}
          tiletypecolour={tile['tiletypecolour']}
          tiletypeinfo = {tile['tiletypeinfo']}  
          tiletypeisplant={tile['tiletypeisplant']}>
        </Tile>
      )
    })


    
    // let myPaddingStyle = {
    //   paddingTop: 0,
    //   paddingBottom: 0,
    //   paddingLeft:0,
    //   paddingRight:0,
    // }


    return (
      <div style={ style.commentList }>
        <form onSubmit={this.handleFormSubmit}>
          {this.createCheckboxes()}

          <button className="btn btn-default" type="submit">Multiple Orders</button>
        </form>
        {tileNodes}
        
      </div>  
    )
  }
}

export default TileList;

      // <Container>
      //   <div style = {myPaddingStyle} className = "col-md-2 ">
      //     {tileNodes.slice(0,2)}
      //   </div>
      //   <div style = {myPaddingStyle} className = "col-md-2 ">
      //     {tileNodes.slice(2,4)}
      //   </div>
      //   <div style = {myPaddingStyle} className = "col-md-2 ">
      //     {tileNodes.slice(2,4)}
      //   </div>
      //   <div style = {myPaddingStyle} className = "col-md-2">
      //     {tileNodes.slice(2,4)}
      //   </div>
      //     <div style = {myPaddingStyle} className = "col-md-2">
      //     {tileNodes.slice(2,4)}
      //   </div>
      // </Container>