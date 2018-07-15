import React, { Component } from 'react';
import './App.css';

export default class Display extends Component {
    componentDidUpdate(prevProps) {
      if (this.props.gameModel.winner === 'none' &&
          !this.props.gameModel.stalemate &&
          this.props.gameModel.wargame) {
              console.log('display component did update');
              const randomColumn = Math.floor(Math.random() * (8 - 1)) + 1;
              this.props.initWargame(randomColumn);
      }
    }

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
        console.log('display gameModel: ', this.props.gameModel);
        const randomColumn = Math.floor(Math.random() * (8 - 1)) + 1;
        return (
            <div className="App-display">
                {this.gameInProgress()}
                {this.props.gameModel.error ? 
                    <div className="App-display-error">{"Error: " + this.props.gameModel.error}</div> : <div />}
                <button className="App-display-button" 
                        onClick={() => this.props.initWargame(randomColumn)}>
                Yes, number of players zero
                </button>
            </div>
        )
    }
}