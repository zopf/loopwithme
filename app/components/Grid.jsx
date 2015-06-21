import React from 'react';
import Cell from './Cell';

export default class Grid extends React.Component {
  render() {
    var cells=[];
    var self = this;
    this.props.cells.forEach(function(cell, i) {
      cells.push(<Cell handleSelection={self.props.handleSelection.bind(this, i)}  key={i} {...cell} />);
    });
    return <ul className='grid'>
              {cells}
           </ul>;
  }
}
