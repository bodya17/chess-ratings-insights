import React, { Component } from 'react';
import propTypes from 'prop-types';

class SearchInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <input type="text" onChange={this.props.onChange} />
        );
    }
}

SearchInput.propTypes = {
  onChange: propTypes.func
};

export default SearchInput;
