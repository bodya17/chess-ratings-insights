import React, { Component } from 'react';
import ReactChart from 'react-highcharts';
import Highcharts from 'highcharts';

const getConfig = (data) => ({
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Розподіл гравців по областях'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data
    }]
})


class Pie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        fetch('http://localhost:3000/count')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    data: data.map(d => ({
                        name: d[0], y: d[1]
                    }))
                })
            })
    }

    render() {
        return (
            <ReactChart config={getConfig(this.state.data)} />
        );
    }
}

export default Pie;
