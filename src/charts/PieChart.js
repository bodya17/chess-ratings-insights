import React, { Component } from 'react';
import baseURL from '../baseURL';
import HighchartsDrilldown from './HighchartsDrilldown';

class Pie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                series: [],
                drilldown: []
            }
        };
    }

    componentDidMount() {
        fetch(`${baseURL}/count-for-pie-chart-with-drilldown`)
            .then(res => res.json())
            .then(data => {
                this.setState({ data })
            })
    }

    render() {
        const chart = this.state.data.series.length > 0 ? <HighchartsDrilldown
            series={this.state.data.series}
            drilldown={this.state.data.drilldown}

        /> : null;
        return (
            <div>
                {chart}
            </div>);
    }
}

export default Pie;
