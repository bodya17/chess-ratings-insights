import ReactTable from 'react-table'
import 'react-table/react-table.css'
import React, { Component } from 'react'
import R from 'ramda';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            limit: null
        };
        this.getData = this.getData.bind(this)
    }

    componentDidMount() {
        this.getData()
    }

    getData(limit='') {
        fetch(`http://localhost:3000/?limit=${limit}`)
            .then(res => res.json())
            .then(players => this.setState({ players }))
    }

    render() {
        const columns = [{
            Header: 'Name',
            accessor: 'lastName',
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

        }, {
            Header: 'Federation',
            accessor: 'fed'
        }];

        return (
            <div>
                <input
                    style={{margin: '10px'}}
                    type="text"
                    placeholder="limit"
                    onChange={e => this.getData(+e.target.value)}
                />
                <ReactTable
                    pivotBy={['fed']}
                    data={this.state.players}
                    columns={columns}
                    // defaultSortMethod={(...args) => {
                    //     console.log(args)
                    // }}
                />
            </div>)

    }
}

export default Table
