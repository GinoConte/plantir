import React, { Component } from 'react';
import Tile from './Tile';
import style from './style';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
import ReactGridLayout from 'react-grid-layout';

import { Container, Row, Col } from 'reactstrap';

class TileList extends Component {
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
        <div key={tile.gridorder} data-grid={{x:0,y:0,w: 3, h: 2, minW: 2, maxW: 8,minH: 1, maxH:4}}>
          <Tile
            uniqueID={tile['_id']} 
            key={tile['_id']} 
            onTileDelete={this.props.onTileDelete} 
            onPlotUpdate={this.props.onPlotUpdate} 
            onTileUpdate={this.props.onTileUpdate}  
            onBiologyClicked={this.props.onBiologyClicked} 
            onTileTypeUpdate={this.props.onTileTypeUpdate} 
            filterState={this.props.filterState}  
            parentgarden={tile.parentgarden} 
            tileprops={tile.tileprops}
            gridorder={tile.gridorder} 
            tiletypename={tile['tiletypename']}
            tiletypecolour={tile['tiletypecolour']}
            tiletypeinfo = {tile['tiletypeinfo']}  
            tiletypeisplant={tile['tiletypeisplant']}>
          </Tile>
        </div>
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
        <ReactGridLayout  style={myPaddingStyle} className="layout" cols={16} rowHeight={50} width={600}>
          <div key={0} _grid={{x: 0, y: 0, w: 3, h: 1}}><tileNodes/></div>
          <div key={1} _grid={{x: 3, y: 0, w: 3, h: 1}}><tileNodes/></div>
          <div key={2} _grid={{x: 6, y: 0, w: 3, h: 1}}><tileNodes/></div>
          <div key={3} _grid={{x: 9, y: 0, w: 3, h: 1}}><tileNodes/></div>
          <div key={4} _grid={{x: 12, y: 0, w: 3, h: 1}}><tileNodes/></div>
          <div key={5} _grid={{x: 0, y: 2, w: 3, h: 1}}><tileNodes/></div>
          <div key={6} _grid={{x: 3, y: 2, w: 3, h: 1}}><tileNodes/></div>
          <div key={7} _grid={{x: 6, y: 2, w: 3, h: 1}}><tileNodes/></div>
          <div key={8} _grid={{x: 9, y: 2, w: 3, h: 1}}><tileNodes/></div>
          <div key={9} _grid={{x: 12, y: 2, w: 3, h: 1}}><tileNodes/></div>
          <div key={10} _grid={{x: 0, y: 4, w: 3, h: 1}}><tileNodes/></div>
          <div key={11} _grid={{x: 3, y: 4, w: 3, h: 1}}><tileNodes/></div>
          <div key={12} _grid={{x: 6, y: 4, w: 3, h: 1}}><tileNodes/></div>
          <div key={13} _grid={{x: 9, y: 4, w: 3, h: 1}}><tileNodes/></div>
          <div key={14} _grid={{x: 12, y: 4, w: 3, h: 1}}><tileNodes/></div>
          <div key={15} _grid={{x: 0, y: 6, w: 3, h: 1}}><tileNodes/></div>
          <div key={16} _grid={{x: 3, y: 6, w: 3, h: 1}}><tileNodes/></div>
          <div key={17} _grid={{x: 6, y: 6, w: 3, h: 1}}><tileNodes/></div>
          <div key={18} _grid={{x: 9, y: 6, w: 3, h: 1}}><tileNodes/></div>
          <div key={19} _grid={{x: 12, y: 6, w: 3, h: 1}}><tileNodes/></div>
          <div key={20} _grid={{x: 0, y: 8, w: 3, h: 1}}><tileNodes/></div>
          <div key={21} _grid={{x: 3, y: 8, w: 3, h: 1}}><tileNodes/></div>          
          <div key={22} _grid={{x: 6, y: 8, w: 3, h: 1}}><tileNodes/></div>
          <div key={23} _grid={{x: 9, y: 8, w: 3, h: 1}}><tileNodes/></div>
          <div key={24} _grid={{x: 12, y: 8, w: 3, h: 1}}><tileNodes/></div>
          
        
          {tileNodes}

        </ReactGridLayout>
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
