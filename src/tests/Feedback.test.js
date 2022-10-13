import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';

describe('Teste o componente Feedback', () => {
  it('Verifica elementos', () => {
    renderWithRouterAndRedux(<Feedback />);
    const img = screen.getByRole('img', { name: /foto da pessoa/i });
    expect(img).toBeInTheDocument();

    const text = screen.getByText(/could be better\.\.\./i);
    expect(text).toBeInTheDocument();

    const buttonPlay = screen.getByRole('button', { name: /play again/i });
    expect(buttonPlay).toBeInTheDocument();

    const buttonRanking = screen.getByRole('button', { name: /ranking/i });
    expect(buttonRanking).toBeInTheDocument();
  });
});
