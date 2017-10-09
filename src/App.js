import React, { Component } from 'react';
import './App.css';
import Table from './Table';
import Chart from './Chart';

class App extends Component {
  render() {
    return (
      <div>
          <Table />
          <Chart />
      </div>
    );
  }
}

export default App;
