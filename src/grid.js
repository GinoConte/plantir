import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import RGL, { WidthProvider } from 'react-grid-layout';

const ReactGridLayout = WidthProvider(RGL);


class BasicLayout extends React.PureComponent {

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
    minW: 2,
    minH: 4,
  };

  constructor(props) {
    super(props);
  }
  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <ReactGridLayout {...this.props}>
        {this.props.tiles}
      </ReactGridLayout>
    );
  }
}

export default BasicLayout;
