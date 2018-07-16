import React, { Component } from 'react';
import './App.css';

export default class Display extends Component {
    componentDidUpdate(prevProps) {
      if (this.props.gameModel.winner === 'none' &&
          !this.props.gameModel.stalemate &&
          this.props.gameModel.wargame) {
              const randomColumn = Math.floor(Math.random() * (8 - 1)) + 1;
              this.props.initWargame(randomColumn);
      }
    }

    gameInProgress = () => {
        return (
            <div>
                <div>Please click on the column</div>
                <div>headers to play</div>
                <div className='App-display-winner'>{`Winner: `}</div>
                <div className={this.props.gameModel.winner === 'none' ? 
                    '' : 
                    this.props.gameModel.winner === 'Player 1' ? 
                        'App-display-winner-playerone' : 
                        'App-display-winner-playertwo'}>
                    {this.props.gameModel.stalemate ? 'stalemate' : this.props.gameModel.winner}
                </div>
            </div>
        );
    }

    render() {
        const randomColumn = Math.floor(Math.random() * (8 - 1)) + 1;
        return (
            <div className="App-display">
                {this.gameInProgress()}
                {this.props.gameModel.error ? 
                    <div className="App-display-error">{"Error: " + this.props.gameModel.error}</div> : <div />}
                <button className="App-display-button" 
                        onClick={() => this.props.initWargame(randomColumn)}>
                number of players zero
                </button>
            </div>
        )
    }
}