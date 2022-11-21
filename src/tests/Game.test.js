import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Game from '../pages/Game';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

describe('Teste o componente Game', () => {
  it('Testa game', async () => {
    renderWithRouterAndRedux(<Game />);
    const category = await screen.findByTestId('question-category')
  })
});
