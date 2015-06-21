import React from 'react';
import Grid from './Grid';
import PadContainer from './PadContainer';
import _ from 'underscore';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {cells:[]};
    this.state =
    // default: set state selected true
    {cells:[{loop:[0,0,0,0,1,0,0,1,0,1,0,0,1,1,0,1,0], selected:true},{loop:[0,0,0,0,1,0,0,1,0,1,0,0,1,1,0,1,0]},{loop:[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{loop:[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{loop:[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{loop:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{loop:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{loop:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{loop:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}]};
    this.startWebSocket();
  }
  startWebSocket() {
    var wsUri = 'ws://loop-with-me-api.herokuapp.com';
    this.websocket = new WebSocket(wsUri);
    this.websocket.onopen = function(evt) {  };
    this.websocket.onclose = function(evt) {  };
    this.websocket.onmessage = function(evt) {
      // debugger;
      var obj = JSON.parse(evt.data);
      console.log(obj);
      if(obj.action == 'grid_update') {
        obj.cells[0].selected = true;
        this.setState(obj);
      } else if(obj.action == 'cell_update') {
        const cells = this.state.cells;
        var cell = _.where( cells, {row:obj.row, col:obj.col} )[0];
        cell.loop = obj.loop;
        console.log(this.state);
        this.setState({
          rows: this.state.rows,
          cols: this.state.cols,
          loop_length: this.state.loop_length,
          cells: cells
        });
        console.log(this.state);
      }
    }.bind(this);
    this.websocket.onerror = function(evt) { console.log(evt.data) };
  }
  sendCellUpdate(cell) {
    const message = cell;
    message.action = 'cell_update';
    this.websocket.send(JSON.stringify(message));
  }
  setSelection(cellIndex){
    var cells = this.state.cells;
    _.each(cells, function(cell){ return cell.selected = false });
    var currentCell = cells[cellIndex];
    var updatedCell = _.where( cells, {row:currentCell.row, col:currentCell.col} )[0];
    updatedCell.selected = true;
    this.setState({cells: cells});
    console.log("Hello the cell was clicked");
  }
  setPadGroup(padIndex){
    var cells = this.state.cells;
    var selectedCell = _.where(cells, {selected: true})[0];
    if(selectedCell.loop[padIndex]){
      selectedCell.loop[padIndex]=0;
    }else{
      selectedCell.loop[padIndex]=1;
    }
    this.setState({cells: cells});
    this.sendCellUpdate(selectedCell);
  }
  render() {
    return (
      <div>
        <Grid handleSelection={this.setSelection.bind(this)} cells={this.state.cells} />
        <PadContainer togglePad={this.setPadGroup.bind(this)} currentCell={_.where(this.state.cells, {selected: true})[0]}/>
      </div>
    );
  }
}
