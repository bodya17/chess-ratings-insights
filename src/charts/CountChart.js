import React, { Component } from 'react';
import ReactChart from 'react-highcharts';
import baseURL from '../baseURL';

class Chart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.getConfig = this.getConfig.bind(this);
    }

    getConfig(data) {
        return {
            chart: {
                type: 'column'
            },
            xAxis: {
                categories: this.state.data.map(d => d[0]),
            },
            yAxis: {
                title: {
                    text: 'Гравців'
                }
            },
            title: {
                text: 'Кількість гравців в кожній області'
            },
            series: [{
                name: 'Гравців',
                data,
                tooltip: {
                    valueDecimals: 0
                }
            }]
        };
    }

    componentDidMount() {
        fetch(`${baseURL}/count`)
            .then(res => res.json())
            .then(data => this.setState({data}))
    }

    render() {
        return (
            <ReactChart config={this.getConfig(this.state.data)}></ReactChart>
        );
    }
}

export default Chart;
