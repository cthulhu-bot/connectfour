import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { render, renderer } from 'react-testing-library';
import 'jest-dom/extend-expect';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('initializes with 42 grey circles and no winner', () => {
});