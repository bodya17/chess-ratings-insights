import React, { Component } from 'react';
import drilldown from 'highcharts/modules/drilldown.js';
import Highcharts from 'highcharts';

drilldown(Highcharts);

class HighchartsDrilldown extends Component {

    componentDidMount() {
        // Create the chart
        Highcharts.chart('container', {
            chart: {
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
                data: this.props.series
            }],
            drilldown: {
                series: this.props.drilldown
            }
        });
    }

    render() {
        return (
            <div id="container"></div>
        );
    }
}

export default HighchartsDrilldown;
