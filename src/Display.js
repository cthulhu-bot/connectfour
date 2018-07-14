import React, { Component } from 'react';

export default class Display extends Component {
    render() {
        return (
            <div>{`Winner: ${this.props.gameModel.winner || 'none'}`}</div>
        )
    }
}