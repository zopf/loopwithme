import React from 'react';
import classNames from 'classnames';

export default class Cell extends React.Component {
  render() {
    var cellValue = this.props.loop.reduce(function(a, b) {
      return a + b;
    });
    var classes = classNames({
      'cell': true,
      'active': cellValue > 0,
      'inactive': cellValue === 0,
      'selected': this.props.selected
    });

    //var activeClass = cellValue > 0 ? 'cell active' : 'cell inactive';

    return <li onClick={this.props.handleSelection} className={classes}>{this.props.loop}</li>;
  }
}

// render: function() {
//   var cx = React.addons.classSet;
//   var classes = cx({
//     'message': true,
//     'message-important': this.props.isImportant,
//     'message-read': this.props.isRead
//   });
//   // same final string, but much cleaner
//   return <div className={classes}>Great, I'll be there.</div>;
// }
