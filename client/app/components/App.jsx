import React from 'react';
import Grid from './Grid';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state =
    // default: set state selected true
    {cells:[{loop:[0,0,0,0,1,0,0,1,0,1,0,0,1,1,0,1,0], selected:true},{loop:[0,0,0,0,1,0,0,1,0,1,0,0,1,1,0,1,0]},{loop:[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{loop:[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{loop:[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{loop:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{loop:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{loop:[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},{loop:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}]};
  }
  render() {
    return (
      <div>
        <Grid cells={this.state.cells} />;
      </div>
    );
  }
}
