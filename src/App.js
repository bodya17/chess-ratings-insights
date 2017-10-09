import React, { Component } from 'react';
import './App.css';
import Table from './Table';
import CountChart from './charts/CountChart';
import AgeChart from './charts/AgeChart';
import Pie from './charts/PieChart';

import { Grid, Row, Col, Panel } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <Grid>
          <Row>
              <Panel><Table /></Panel>
          </Row>
          <Row>
              <Col className="col-lg-6  col-md-12">
                  <Panel><CountChart /></Panel>
              </Col>

              <Col className="col-lg-6  col-md-12">
                  <Panel><AgeChart /></Panel>
              </Col>
          </Row>
          <Row>
              <Col>
                  <Panel><Pie/></Panel>
              </Col>
          </Row>
      </Grid>
    );
  }
}

export default App;
