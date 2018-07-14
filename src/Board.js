import React, { Component } from 'react';

export default class Board extends Component {

  renderCircles() {
    return this.props.boardModel.map((piece, idx) => {
      const circColor = piece === 0 ? "grey" : piece === 1 ? "blue" : "red";
      const xcoord = 150 + (150 * (idx % 7));
      const ycoord = 100 + (120 * Math.floor(idx / 7));
      return <circle cx={xcoord.toString()} cy={ycoord.toString()} r="35" fill={circColor} key={idx} />
    });
  }

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

        {this.renderCircles()}
      </svg>

    );
  }
}