import React, { Component } from 'react';
import Tile from './Tile';
import style from './style';

class TileList extends Component {
  render() {
    let tileNodes = this.props.data.map(tile => {
      return (
        <Tile
          author={ tile.author } 
          uniqueID={ tile['_id'] } 
          onTileDelete={this.props.onTileDelete} 
          onTileUpdate={this.props.onTileUpdate} 
          key={tile['_id']}> 
          {tile.text}
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