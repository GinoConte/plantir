import React, { Component } from 'react';
import Tile from './Tile';
import style from './style';

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
    return (
      <div style={ style.commentList }>
        { tileNodes }
      </div>
    )
  }
}

export default TileList;