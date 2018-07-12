import React, { Component } from 'react';

export default class Board extends Component {
  render() {
    return (
      <svg className="App-board">
        <rect width="100%" height="100%" x="20" y="0" fill="yellow" />

        <text x="150" y="40" fontSize="30" textAnchor="middle" fill="black"
          onClick={this.props.playerTurn(1)}
          className="App-column">1</text>
        <text x="300" y="40" fontSize="30" textAnchor="middle" fill="black"
          onClick={this.props.playerTurn(2)}
          className="App-column">2</text>
        <text x="450" y="40" fontSize="30" textAnchor="middle" fill="black"
          onClick={this.props.playerTurn(3)}
          className="App-column">3</text>
        <text x="600" y="40" fontSize="30" textAnchor="middle" fill="black"
          onClick={this.props.playerTurn(4)}
          className="App-column">4</text>
        <text x="750" y="40" fontSize="30" textAnchor="middle" fill="black"
          onClick={this.props.playerTurn(5)}
          className="App-column">5</text>
        <text x="900" y="40" fontSize="30" textAnchor="middle" fill="black"
          onClick={this.props.playerTurn(6)}
          className="App-column">6</text>
        <text x="1050" y="40" fontSize="30" textAnchor="middle" fill="black"
          onClick={this.props.playerTurn(7)}
          className="App-column">7</text>

        <circle cx="150" cy="100" r="35" fill="grey" />
        <circle cx="300" cy="100" r="35" fill="grey" />
        <circle cx="450" cy="100" r="35" fill="grey" />
        <circle cx="600" cy="100" r="35" fill="grey" />
        <circle cx="750" cy="100" r="35" fill="grey" />
        <circle cx="900" cy="100" r="35" fill="grey" />
        <circle cx="1050" cy="100" r="35" fill="grey" />

        <circle cx="150" cy="220" r="35" fill="grey" />
        <circle cx="300" cy="220" r="35" fill="grey" />
        <circle cx="450" cy="220" r="35" fill="grey" />
        <circle cx="600" cy="220" r="35" fill="grey" />
        <circle cx="750" cy="220" r="35" fill="grey" />
        <circle cx="900" cy="220" r="35" fill="grey" />
        <circle cx="1050" cy="220" r="35" fill="grey" />

        <circle cx="150" cy="340" r="35" fill="grey" />
        <circle cx="300" cy="340" r="35" fill="grey" />
        <circle cx="450" cy="340" r="35" fill="grey" />
        <circle cx="600" cy="340" r="35" fill="grey" />
        <circle cx="750" cy="340" r="35" fill="grey" />
        <circle cx="900" cy="340" r="35" fill="grey" />
        <circle cx="1050" cy="340" r="35" fill="grey" />

        <circle cx="150" cy="460" r="35" fill="grey" />
        <circle cx="300" cy="460" r="35" fill="grey" />
        <circle cx="450" cy="460" r="35" fill="grey" />
        <circle cx="600" cy="460" r="35" fill="grey" />
        <circle cx="750" cy="460" r="35" fill="grey" />
        <circle cx="900" cy="460" r="35" fill="grey" />
        <circle cx="1050" cy="460" r="35" fill="grey" />

        <circle cx="150" cy="580" r="35" fill="grey" />
        <circle cx="300" cy="580" r="35" fill="grey" />
        <circle cx="450" cy="580" r="35" fill="grey" />
        <circle cx="600" cy="580" r="35" fill="grey" />
        <circle cx="750" cy="580" r="35" fill="grey" />
        <circle cx="900" cy="580" r="35" fill="grey" />
        <circle cx="1050" cy="580" r="35" fill="grey" />

        <circle cx="150" cy="700" r="35" fill="grey" />
        <circle cx="300" cy="700" r="35" fill="grey" />
        <circle cx="450" cy="700" r="35" fill="grey" />
        <circle cx="600" cy="700" r="35" fill="grey" />
        <circle cx="750" cy="700" r="35" fill="grey" />
        <circle cx="900" cy="700" r="35" fill="grey" />
        <circle cx="1050" cy="700" r="35" fill="grey" />

      </svg>

    );
  }
}