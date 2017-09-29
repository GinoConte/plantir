import React, { Component } from 'react';
import Tile from './Tile';
import style from './style';

import { Container, Row, Col } from 'reactstrap';

class TileList extends Component {
  render() {
    var test="nope";
    if(this.props.tiletypes.length > 0) {
      test = "ho";
    }

    //match tiletype id
    var tiles = this.props.data.slice();
    var tiletypes = this.props.tiletypes.slice();
    for(var i=0; i<tiles.length; i++) {
      var currentTileTypeID = tiles[i].tiletype;
      //console.log(currentTileTypeID);
      for(var j=0; j<tiletypes.length; j++) {
        //console.log(tiletypes[j].name);
        if(currentTileTypeID === tiletypes[j]._id) {
          tiles[i].tiletypename = tiletypes[j].name;
          tiles[i].tiletypecolour = tiletypes[j].tilecolour;
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
          onTileUpdate={this.props.onTileUpdate}    
          parentgarden={tile.parentgarden} 
          tileprops={tile.tileprops}
          tiletypename={tile['tiletypename']}
          tiletypecolour={tile['tiletypecolour']}>
          {'pls workarino'}
        </Tile>
      )
    })
    let myPaddingStyle = {
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft:0,
      paddingRight:0,
    }

    return (
      <div style={ style.commentList }>
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