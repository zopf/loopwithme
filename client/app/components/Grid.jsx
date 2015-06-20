import React from 'react';
import Cell from './Cell';

export default class Grid extends React.Component {
  render() {
    var cells=[];
    this.props.cells.forEach(function(cell, i) {
      cells.push(<Cell key={i} loop={cell.loop}/>);
    });
    return <ul className='grid'>
              {cells}
           </ul>;
  }
}
