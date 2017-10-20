import style from './style';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
var AmCharts = require("@amcharts/amcharts3-react");
//import AmCharts from "@amcharts/amcharts3-react";

function generateData(name, bloomString) {

  var dataProvider = [{
          "season": "Summer",
          "value": 0,
          }, {
          "season": "Autumn",
          "value": 1
          }, {
          "season": "Winter",
          "value": 0
          }, {
          "season": "Spring",
          "value": 0
  }];

  return dataProvider;
}

class Timeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataProvider: this.updateData(),
      timer: null
    };
    this.updateData = this.updateData.bind(this);
  }
  updateData() {
    let name = this.props.hoverName;
    let bloom = this.props.hoverBloom;

    let summerval = 0;
    let springval = 0;
    let winterval = 0;
    let autumnval = 0;

    if (bloom.includes("summer")) {
      summerval = 1;
    }
    if (bloom.includes("spring")) {
      springval = 1;
    }
    if (bloom.includes("winter")) {
      winterval = 1;
    }
    if (bloom.includes("autumn") || (bloom.includes("fall"))) {
      autumnval = 1;
    }


      var data = [{
          "season": "Summer",
          "value": summerval
          }, {
          "season": "Autumn",
          "value": autumnval
          }, {
          "season": "Winter",
          "value": winterval
          }, {
          "season": "Spring",
          "value": springval
       }];
       this.setState({dataProvider: data});
  }

  componentDidMount() {
    this.setState({
      // Update the chart dataProvider every 3 seconds
      timer: setInterval(() => {this.updateData()}, 1000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  render() {
    const config = {
      "type": "serial",
      "theme": "patterns",
      "marginRight": 40,
      "marginLeft": 40,
      "autoMarginOffset": 20,
      "mouseWheelZoomEnabled": true,
      "valueAxes": [{
        "id": "v1",
        "axisAlpha": 0,
        "position": "left",
        "ignoreAxisWidth": true
      }],
      "balloon": {
        "borderThickness": 1,
        "shadowAlpha": 0
      },
      "graphs": [{
        "id":"g1",
        "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
        "bullet": "round",
        "bulletSize": 8,
        "lineColor": "#d1655d",
        "lineThickness": 2,
        "negativeLineColor": "#637bb6",
        "type": "smoothedLine",
        "valueField": "value"
      }],
      "chartCursor": {
        "pan": true,
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true,
        "cursorAlpha":1,
        "cursorColor":"#258cbb",
        "limitToGraph":"g1",
        "valueLineAlpha":0.2,
        "valueZoomable": true
      },
      "categoryField": "season",
      "categoryAxis": {
        "dashLength": 1,
        "minorGridEnabled": true
      },
      "dataProvider": this.state.dataProvider,
    };

    return (
      <div className="Timeline">
        <p>Bloom time for: {this.props.hoverName}</p>
        <AmCharts.React style={{ width: "100%", height: "200px" }} options={config} />
      </div>
    );

  }
}


export default Timeline;