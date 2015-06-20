import React from 'react';

export default class Cell extends React.Component {
  render() {
    console.log("this.props.loop", this.props.loop);
    var cellValue = this.props.loop.reduce(function(a, b) {
      return a + b;
    });
    var activeClass = cellValue > 0 ? 'cell active' : 'cell inactive';

    return <li className={activeClass}>{this.props.loop}</li>;
  }
}
