import React, { Component } from 'react';
import './App.css';

export default class Display extends Component {
    render() {
        return (
            <div>
                <div>Please click on the column</div>
                <div>headers to play</div>
                <div className='App-display-winner'>{`Winner: ${this.props.gameModel.winner || 'none'}`}</div>
            </div>
        )
    }
}