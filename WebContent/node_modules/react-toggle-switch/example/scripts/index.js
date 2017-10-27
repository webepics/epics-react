import React, {Component} from 'react';
import {render} from 'react-dom';
import Switch from 'react-toggle-switch';
import 'styles/styles.css';

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      on: true
    }
  }

  render() {
    return (
      <Switch onClick={() => this.setState({on: !this.state.on})} on={this.state.on}/>
    );
  }
}

render(<Example/>, document.getElementById('app'));