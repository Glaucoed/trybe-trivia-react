import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';

const initialStateFour = {
  player: {
    score: 0,
    assertions: 4,
  },
}
const initialStateZero = {
  player: {
    score: 0,
    assertions: 0,
  },
};

const playersStorage = [
  {
    playerScore: 830,
    playerName: 'caio',
    playerImage: '9c43f62e5aa6bef78d8441974e42dcd9',
  }
]

const localStorageMock = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
}());

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const setLocalStorage = (id, data) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};



describe('Teste o componente Feedback', () => {
  it('Verifica elementos', () => {
    renderWithRouterAndRedux(<Feedback />, initialStateZero);
    const img = screen.getByRole('img', { name: /foto da pessoa/i });
    expect(img).toBeInTheDocument();

    const text = screen.getByText(/could be better\.\.\./i);
    expect(text).toBeInTheDocument();

    const buttonPlay = screen.getByRole('button', { name: /play again/i });
    expect(buttonPlay).toBeInTheDocument();

    const buttonRanking = screen.getByRole('button', { name: /ranking/i });
    expect(buttonRanking).toBeInTheDocument();
  });
  it('verifica quatro assertions', () => {
    renderWithRouterAndRedux(<Feedback />, initialStateFour);
    const text = screen.getByText(/Well done!/i);
    expect(text).toBeInTheDocument();
  })
  it('Verifica localStorage', () => {
    setLocalStorage('players', playersStorage)
    renderWithRouterAndRedux(<Feedback />);
  });
});
