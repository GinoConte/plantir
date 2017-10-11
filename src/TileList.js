import React, { Component } from 'react';
import Tile from './Tile';
import style from './style';
//import { Container, Row, Col } from 'reactstrap';
import RGL, { WidthProvider } from 'react-grid-layout';
import PropTypes from 'prop-types';

import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';

const ReactGridLayout = WidthProvider(RGL);

class TileList extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  appendTileNum(str, num){
    return str + num.toString();
  }
  static propTypes = {
    onLayoutChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    className: "layout",
    items: 1,
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: 12,
    verticalCompact: false,
  };


  onLayoutChange(layout) {
      
    //alert("This is here to annoy you.");
  }
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
        <div key={tile['_id']} data-grid={{x:tile['x'], y:tile['y'],w:tile['width'],h:tile['height'], minW:2, minH:4}} 
          style={Object.assign(style.tile, {backgroundColor: tile['tiletypecolour']})} > {tile['tiletypecolour']}
          <Tile
            uniqueID={tile['_id']} 
            key={tile['_id']} 
            onTileDelete={this.props.onTileDelete} 
            onPlotUpdate={this.props.onPlotUpdate} 
            onTileUpdate={this.props.onTileUpdate}  
            onBiologyClicked={this.props.onBiologyClicked} 
            onTileTypeUpdate={this.props.onTileTypeUpdate} 
            onWaterClicked={this.props.onWaterClicked} 
            filterState={this.props.filterState}  
            parentgarden={tile.parentgarden} 
            tileprops={tile.tileprops}
            gridorder={tile.gridorder} 
            lastwatered={tile.lastwatered} 
            tiletypename={tile['tiletypename']}
            tiletypecolour={tile['tiletypecolour']}
            tiletypeinfo = {tile['tiletypeinfo']}  
            tiletypeisplant={tile['tiletypeisplant']}>
          </Tile>
        </div>
      )
    })




    return (
      <ReactGridLayout {...this.props} onLayoutChange={this.onLayoutChange}>
        {tileNodes}
      </ReactGridLayout>
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

          // let myPaddingStyle = {
    //   paddingTop: 0,
    //   paddingBottom: 0,
    //   paddingLeft:0,
    //   paddingRight:0,
    // }