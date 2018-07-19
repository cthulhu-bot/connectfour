import React from 'react';
import { render } from 'react-testing-library';
import Display from './Display';
import 'jest-dom/extend-expect'

const gameModel = {
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

test('display should display text', () => {
    const { container } = render(<Display gameModel={gameModel} />);
    expect(container).toHaveTextContent('Please click on the column');
})