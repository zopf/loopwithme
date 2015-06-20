import React from 'react';
import Pad from './Pad';

export default class PadContainer extends React.Component {
  render() {
    var pads=[];
    var self = this;
    this.props.currentCell.loop.forEach(function(pad, i) {
      pads.push(<Pad togglePad={self.props.togglePad.bind(this, i)} key={i} value={pad}/>);
    });
    return(
      <div className="padContainer">
        <ul>
          {pads}
        </ul>
      </div>
    );
  }
}
