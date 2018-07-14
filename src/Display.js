import React, { Component } from 'react';
import './App.css';

export default class Display extends Component {

    gameInProgress = () => {
        return (
            <div>
                <div>Please click on the column</div>
                <div>headers to play</div>
                <div className='App-display-winner'>{`Winner: ${this.props.gameModel.stalemate ? 'stalemate' : this.props.gameModel.winner}`}</div>
            </div>
        );
    }

    render() {
        console.log(this.props.gameModel);
        return (
            <div className="App-display">
                {this.gameInProgress()}
                {this.props.gameModel.error ? 
                    <div className="App-display-error">{"Error: " + this.props.gameModel.error}</div> : <div />}
                <button className="App-display-button" 
                        onClick={this.props.wargames}>
                Number of players = zero
                </button>
            </div>
        )
    }
}