import React from 'react';
import classNames from 'classnames';

export default class Pad extends React.Component {
  render() {
    // var cellValue = this.props.loop.reduce(function(a, b) {
    //   return a + b;
    // });
    var classes = classNames({
      'pad': true,
      'soundOn': this.props.value > 0,
      'soundOff': this.props.value < 0
    });

    //var activeClass = cellValue > 0 ? 'cell active' : 'cell inactive';

    return <li onClick={this.props.togglePad} className={classes}></li>;
  }
}
