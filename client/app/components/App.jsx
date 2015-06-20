import React from 'react';
import Grid from './Grid';
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
    var wsUri = 'ws://localhost:5000/';
    this.websocket = new WebSocket(wsUri); 
    this.websocket.onopen = function(evt) {  }; 
    this.websocket.onclose = function(evt) {  }; 
    this.websocket.onmessage = function(evt) { 
      // debugger;
      var obj = JSON.parse(evt.data);
      console.log(obj);
      if(obj.action == 'grid_update') {
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
  render() {
    return (
      <div>
        <Grid cells={this.state.cells} />;
      </div>
    );
  }
}
