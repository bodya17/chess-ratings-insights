import ReactTable from 'react-table';
import 'react-table/react-table.css';
import React, { Component } from 'react';
import R from 'ramda';
import Search from './Search';
import baseURL from './baseURL';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            query: ''
            // limit: null
        };
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    // getData(limit) {
    //     fetch(`http://localhost:3000/?limit=${limit}`)
    //         .then(res => res.json())
    //         .then(players => this.setState({players}));
    // }

    getData(query) {
        fetch(`${baseURL}/user/${query}`)
            .then(res => res.json())
            .then(players => {
                console.log(players)
                this.setState({players})
            })
    }

    render() {
        const columns = [{
            Header: 'Name',
            id: 'name',
            accessor: p => `${p.lastName} ${p.firstName}`,
            aggregate: R.always('')
        }, {
            Header: 'Rating',
            id: 'rating',
            accessor: 'ratings[0].ukrRating',
            aggregate: R.pipe(R.mean, n => n.toFixed(2))
        }, {
            Header: 'Title',
            accessor: 'ratings[0].title',
            aggregate: R.always('')
        }, {
            Header: 'Birthday',
            id: 'birth',
            aggregate: birthdays => new Date(R.mean(birthdays.map(b => new Date(b).getTime()))).toDateString(),
            accessor: p => new Date(p.dob).toDateString(),
            sortMethod: (a, b) => new Date(a).getTime() < new Date(b).getTime() ? -1 : 1

        }, {
            Header: 'Federation',
            accessor: 'fed'
        }];

        return (
            <div>
                <Search onChange={(e) => this.getData(e.target.value )} />
                <ReactTable
                    //pivotBy={['fed']}
                    className="-striped"
                    data={this.state.players}
                    columns={columns}
                    collapseOnSortingChange={false}
                />
            </div>);

    }
}

export default Table;
