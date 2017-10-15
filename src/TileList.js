import React, { Component } from 'react';
import Tile from './Tile';
import style from './style';
//import { Container, Row, Col } from 'reactstrap';
import RGL, { WidthProvider } from 'react-grid-layout';
import PropTypes from 'prop-types';

import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';

const ReactGridLayout = WidthProvider(RGL);

class TileList extends Component {
  
  /*static propTypes = {
    onLayoutChange: PropTypes.func.isRequired
  };*/

  static defaultProps = {
    className: "layout",
    items: 1,
    rowHeight: 30,
    //onLayoutChange: function() {},
    cols: 12,
    compactType: null,
  };

  state = {
    layouts: [],
  }

  constructor(props) {
    super(props);
    const layout = this.props.layout;
    console.log("constructor tilelist layout");
    console.log(layout);
    console.log("/constructor");
    this.state ={
      layouts: layout
    }
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.handleCreateTile = this.handleCreateTile.bind(this);
  }
  onLayoutChange(newLayout, layout) {
    if(typeof newLayout[0] !== "undefined"){
      if(!(newLayout[0].w == 1 && newLayout[0].h == 1 && newLayout[0].x == 0)){
        console.log("On layout CHange");
        console.log(layout);
        console.log(newLayout);
        this.setState({layouts : newLayout});
        this.props.onLayoutChange(newLayout);
      }
    }
  }
  /*generateLayout(){
    /*var tiles = this.props.data.slice();
    let layout = tiles.map(tile => {
      return(
          {i:tile['_id'],x:tile['x'], y:tile['y'],w:tile['width'],h:tile['height'], minW:2, minH:4}
      );
    });
    let layout = this.props.layout;
    return layout;
  }

  updateLayout(){
    let layout = this.generateLayout();
    this.setState({layout});
  }

  appendTileNum(str, num){
    return str + num.toString();
  }
*/
  handleCreateTile(e) {
    e.preventDefault();
    this.props.onCreateTile();
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
      let key = tile['gridorder'].toString();
      console.log(tile['gridorder'].toString());
      let vals = this.props.layout.filter(function (obj){
        console.log("Obj gridorder");
        console.log(obj.i);
        console.log("Tile gridorder");
        console.log(tile['gridorder']);
        if(obj.i == tile['gridorder'].toString()){
          console.log("FOUND");
        }
        return obj.i == tile['gridorder'].toString();
      });
      console.log("vals");
      console.log(vals);
      return (
        <div key={key} data-grid={{x: vals.x, y: vals.y, w: vals.w, h: vals.h}} 
          style={Object.assign(style.tile, {backgroundColor: tile['tiletypecolour']})} > 
          {tile['_id']} {vals.x} {vals.y} {vals.h} {vals.w}
          <Tile
            uniqueID={tile['_id']} 
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
    console.log("Prop Layout");
    console.log(this.props.layout);
    console.log("State layout");
    console.log(this.state.layouts);
    var layoutasdfg = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
      {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'c', x: 4, y: 0, w: 1, h: 2}
    ];
    /*console.log(typeof(this.state.layouts[0].i));
    console.log(this.state.layouts[0].i);
    /*let myLayout = [
      {i: '59e2c53b9d88c20cc813a365', x: 2, y: 2, w: 2, h: 2, static: true},
      {i: '59e2c5459d88c20cc813a366', x: 5, y: 0, w: 1, h: 4}
    ];layout={this.state.layouts}
    console.log("My layout");   {...this.props}  layout={this.props.layout}                  
    console.log(myLayout);*/ 
    return (
      <div>
      <button onClick={this.handleCreateTile}>Create Tile</button>
      <ReactGridLayout className="layout"  onLayoutChange={(layout, layouts) => this.onLayoutChange(layout,layouts)}
          rowHeight={30} cols={12} compactType='null'>
          {tileNodes}
      </ReactGridLayout>
      </div>
    )
  }
}

export default TileList;
/*        <div key="a">a</div>
        <div key="b">b</div>
        <div key="c">c</div> */
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