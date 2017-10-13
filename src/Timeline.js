import style from './style';
import React, { Component } from 'react';

import _ from "underscore";
//import Select from "react-select";
import colorbrewer from "colorbrewer";

// Pond

// Imports from the charts library
import { Charts, Legend, AreaChart, ChartContainer, ChartRow, YAxis, LineChart, BarChart, Resizable, styler } from "react-timeseries-charts";
import { TimeSeries, TimeRange, Index } from "pondjs";

// import continents_docs from "./continents_docs.md";
// import continents_thumbnail from "./continents_thumbnail.png";


class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = { gardenid: '' };
    this.handleTokenChange = this.handleTokenChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTokenChange(e) {
    this.setState({ gardenid: e.target.value });
  }
  handleCreate(e) {
    e.preventDefault();
    this.setState({ gardenid: '' });
    this.props.onCreateClicked();
  }
  handleSubmit(e) {
    e.preventDefault();
    let token = this.state.gardenid.trim();
    if (!token) {
      return;
    }
    this.props.onTokenSubmit(token)
    this.setState({ gardenid: '' });
  }
  getInitialState() {
    return {
        highlight: null,
        selection: null,
        scheme: "Paired"
    };
  }
  handleSchemeChange({ value }) {
    this.setState({ scheme: value });
  }
  render() {

  const data = [
      ["2017-01-24 00:00", 0.01],
      ["2017-01-24 01:00", 0.13],
      ["2017-01-24 02:00", 0.07],
      ["2017-01-24 03:00", 0.04],
      ["2017-01-24 04:00", 0.33],
      ["2017-01-24 05:00", 0.2],
      ["2017-01-24 06:00", 0.08],
      ["2017-01-24 07:00", 0.54],
      ["2017-01-24 08:00", 0.95],
      ["2017-01-24 09:00", 1.12],
      ["2017-01-24 10:00", 0.66],
      ["2017-01-24 11:00", 0.06],
      ["2017-01-24 12:00", 0.3],
      ["2017-01-24 13:00", 0.05],
      ["2017-01-24 14:00", 0.5],
      ["2017-01-24 15:00", 0.24],
      ["2017-01-24 16:00", 0.02],
      ["2017-01-24 17:00", 0.98],
      ["2017-01-24 18:00", 0.46],
      ["2017-01-24 19:00", 0.8],
      ["2017-01-24 20:00", 0.39],
      ["2017-01-24 21:00", 0.4],
      ["2017-01-24 22:00", 0.39],
      ["2017-01-24 23:00", 0.28]
  ];

  const rawData = data;
  const numPoints = rawData.length;
  const columnNames = rawData.map(d => d.key);

  const name = "series";
  const columns = ["time", ...columnNames];
  const points = [];

  for (let i = 0; i < numPoints; i++) {
      const t = rawData[0].values[i][0];
      const point = [t];
      _.each(rawData, d => {
          point.push(d.values[i][1]);
      });
      points.push(point);
  }

  const series = new TimeSeries({ name, columns, points });


  const cols = { up: columnNames, down: [] };
  const min = 0;
  const max = 130;
  const axisType = "linear";
  const interpolationType = "curveBasis";
  const options = Object.keys(colorbrewer).map(c => ({ value: c, label: c }));
  const style = styler(columnNames, this.state.scheme);
  const legendCategories = columnNames.map(d => ({ key: d, label: d }));



    return (
                  <div>
                <div className="row">
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-9">
                        <Legend categories={legendCategories} style={style} type="dot" />
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <Resizable>
                            <ChartContainer
                                timeRange={series.range()}
                                onBackgroundClick={() => this.setState({ selection: null })}
                            >
                                <ChartRow height="350">
                                    <YAxis
                                        id="value"
                                        min={min}
                                        max={max}
                                        width="60"
                                        type={axisType}
                                    />
                                    <Charts>
                                        <AreaChart
                                            axis="value"
                                            style={style}
                                            series={series}
                                            columns={cols}
                                            fillOpacity={0.4}
                                            interpolation={interpolationType}
                                            highlight={this.state.highlight}
                                            onHighlightChange={highlight =>
                                                this.setState({ highlight })}
                                            selection={this.state.selection}
                                            onSelectionChange={selection =>
                                                this.setState({ selection })}
                                        />
                                    </Charts>
                                </ChartRow>
                            </ChartContainer>
                        </Resizable>
                    </div>
                </div>
</div>
    )
  }
}

export default Timeline;