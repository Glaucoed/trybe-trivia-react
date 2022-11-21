import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

const playersStorage = [
  {
    playerScore: 830,
    playerName: 'caio',
    playerImage: '9c43f62e5aa6bef78d8441974e42dcd9',
  },
  {
    playerScore: 82,
    playerName: 'pedro',
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

describe('Teste o componente Ranking', () => {
  it('Testa nome caio', () => {
    setLocalStorage('players', playersStorage);
    renderWithRouterAndRedux(<Ranking />);
    const name = screen.getByTestId('player-name-0');
    expect(name).toBeInTheDocument();
  })
  it('Testa botao Home', () => {
    setLocalStorage('players', playersStorage);
    const { history } = renderWithRouterAndRedux(<Ranking />);
    const homeBtn = screen.getByTestId('btn-go-home')
    act(() => userEvent.click(homeBtn))
  })
});
