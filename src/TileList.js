import React, { Component } from 'react';
import Tile from './Tile';
import style from './style';

import { Container, Row, Col } from 'reactstrap';

class TileList extends Component {
  render() {
    let tileNodes = this.props.data.map(tile => {
      return (
        <Tile
          uniqueID={tile['_id']} 
          key={tile['_id']} 
          onTileDelete={this.props.onTileDelete} 
          onTileUpdate={this.props.onTileUpdate}    
          parentgarden={tile.parentgarden} 
          tileprops={tile.tileprops}>
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

      <Container>
        <div style = {myPaddingStyle} className = "col-md-2 ">
          {tileNodes.slice(0,2)}
        </div>
        <div style = {myPaddingStyle} className = "col-md-2 ">
          {tileNodes.slice(2,4)}
        </div>
        <div style = {myPaddingStyle} className = "col-md-2 ">
          {tileNodes.slice(2,4)}
        </div>
        <div style = {myPaddingStyle} className = "col-md-2">
          {tileNodes.slice(2,4)}
        </div>
          <div style = {myPaddingStyle} className = "col-md-2">
          {tileNodes.slice(2,4)}
        </div>
      </Container>
      
    )
  }
}

export default TileList;
