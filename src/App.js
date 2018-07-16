import React, { Component } from 'react';
import Board from './Board';
import Display from './Display';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.gameModel = {
      winner: 'none',
      currentPlayer: 'Player 1',
      boardModel: [0, 0, 0, 0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0],
        error: null,
        stalemate: false,
        wargame: false,
    };
    this.state = {
      gameModel: this.gameModel,
    }
  }

  playerTurn = (columnNum) => () => {
    const currentPlayer = this.gameModel.currentPlayer;

    try {
      this.gameModel = this.placePiece(columnNum, this.gameModel);
    } catch (e) {
      this.setState((prevState, props) => {
        this.gameModel.error = e.message;
        return { gameModel: this.gameModel };
      });
      return;
    }

    this.gameModel.currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
    this.gameModel.error = null;
    this.gameModel.stalemate = this.gameModel.winner === 'none' &&
                               this.boardFilled(this.gameModel.boardModel);

    this.setState((prevState, props) => {
      return { gameModel: this.gameModel };
    });
  }

  placePiece(column, gameModel) {
    let newGameModel = gameModel, newPiecePos = null;
    const columnSlots = newGameModel.boardModel.filter((slot, idx) => idx % 7 === column - 1);
    const columnFilled = columnSlots.every((slot, idx) => slot !== 0);

    if (!columnFilled) {
      const firstEmptySlot = columnSlots.reduce((acc, slot, idx) => {
        return slot === 0 ? idx : acc;
      }, 0);
      newPiecePos = (column - 1) + (7 * firstEmptySlot);
      newGameModel.boardModel[newPiecePos] = gameModel.currentPlayer === 'Player 1' ? 1 : 2;
    } else {
      throw { message: `Column ${column} filled` };
    }
    if (gameModel.winner === 'none' && !gameModel.stalemate) {
      newGameModel.winner = this.evalWinner(gameModel.boardModel, newPiecePos, gameModel.currentPlayer);
    }
    
    return newGameModel;
  }

  /* The IsThereAWinner? algorithm:
     Reduction of the 7x7 matrix surrounding the last placed piece
     Reduce the 7x7 to the 4 axes surrounding the new piece:
      1. Vertical
      2. Horizontal
      3. Diagonal (forward slash)
      4. Diagonal (back slash)
     Build up these 4 different axes and reduce to see if any of them
     have 4 of the same contiguous color */
  evalWinner = (boardModel, lastPosition, currentPlayer) => {
    let vertical = [], horizontal = [], fslash = [], bslash = [];
    const playerColor = currentPlayer === 'Player 1' ? 1 : 2;

    vertical = this.getVerticalPiecesAroundCenter(boardModel, lastPosition);
    horizontal = this.getHorizontalPiecesAroundCenter(boardModel, lastPosition);
    fslash = this.getFSlashPiecesAroundCenter(boardModel, lastPosition);
    bslash = this.getBSlashPiecesAroundCenter(boardModel, lastPosition);
    let axes = [vertical, horizontal, fslash, bslash];

    const canHazWinner = axes.some(axis => {
      console.log(axis);
      const maxRowLength = this.getMaxRowLength(axis, playerColor);
      return maxRowLength >= 4;
    });

    return canHazWinner ? currentPlayer : 'none';
  }

  getVerticalPiecesAroundCenter = (boardModel, center) => {
    let vertical = [];
    for (let i = -3; i <= 3; i++) {
      if (boardModel[center + (i*7)] >= 0) {
        vertical.push(boardModel[center + (i*7)]);
      }
    }
    return vertical;
  }

  getHorizontalPiecesAroundCenter = (boardModel, center) => {
    let horizontal = [];
    const leftBoundary = center - (center % 7);
    const rightBoundary = center + (6 - (center % 7));
    for (let i = -3; i<= 3; i++) {
      const horizontalIdx = center + i;
      if (boardModel[horizontalIdx] >= 0 && 
          (horizontalIdx >= leftBoundary) && 
          (horizontalIdx <= rightBoundary)) {
        horizontal.push(boardModel[horizontalIdx]);
      }
    }
    return horizontal;
  }

  getFSlashPiecesAroundCenter = (boardModel, center) => {
    let fslash = [];
    for (let i = -3; i <= 3; i++) {
      const rightBoundary = ((Math.floor((center + (i*7)) / 7) + 1) * 7) - 1;
      const leftBoundary = rightBoundary - 6;
      const fslashIdx = center + ((i*7) - i);
      if (boardModel[fslashIdx] >= 0 && 
          fslashIdx <= rightBoundary &&
          fslashIdx >= leftBoundary) {
        fslash.push(boardModel[fslashIdx]);
      }
    }
    return fslash;
  }

  getBSlashPiecesAroundCenter = (boardModel, center) => {
    let bslash = [];
    for (let i = -3; i <= 3; i++) {
      const rightBoundary = ((Math.floor((center + (i*7)) / 7) + 1) * 7) - 1;
      const leftBoundary = rightBoundary - 6;
      const bslashIdx = center + ((i*7) + i);
      if (boardModel[bslashIdx] >= 0 &&
          bslashIdx <= rightBoundary &&
          bslashIdx >= leftBoundary) {
        bslash.push(boardModel[bslashIdx]);
      }
    }
    return bslash;
  }

  getMaxRowLength = (arr, player) => {
    const maxLengths = [];
    let currLength = 0;
    arr.forEach(entry => {
      if (entry === player) {
        currLength++;
      } else {
        maxLengths.push(currLength);
        currLength = 0;
      }
    });
    maxLengths.push(currLength);
    return Math.max(...maxLengths);
  }

  boardFilled = (boardModel) => boardModel.every(piece => piece !== 0);

  initWargame = (column) => {
    this.setState((prevState, props) => {
      this.gameModel.wargame = true;
      return { gameModel: this.gameModel };
    }, this.playerTurn(column));
  };

  render() {
    return (
      <div className="App">
        <Board playerTurn={this.playerTurn}
               boardModel={this.state.gameModel.boardModel} />
        <Display gameModel={this.state.gameModel}
                 playerTurn={this.playerTurn}
                 initWargame={this.initWargame} />
      </div>
    );
  }
}

export default App;
