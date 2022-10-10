import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Teste o componente Login', () => {
  it('Teste se os inputs aparecem na tela', () => {
    renderWithRouterAndRedux(<App />);

    const idName = 'input-player-name';
    const idEmail = 'input-gravatar-email';

    const inputName = screen.getByTestId(idName);
    const inputEmail = screen.getByTestId(idEmail);

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
  });

  it('Teste se o button Play é renderizado e se aparece na tela', () => {
    renderWithRouterAndRedux(<App />);

    const idPlay = 'btn-play';    
    const testPlay = screen.getByTestId(idPlay);
    expect(testPlay).toBeInTheDocument();

    const btnPlay = screen.getByRole('button', {
      name: /play/i,
    });
    expect(btnPlay).toBeInTheDocument();
  });

  it('Teste se o button Configuração é renderizado e se aparece na tela', () => {
    renderWithRouterAndRedux(<App />);

    const idSettings = 'btn-settings';    
    const testSettings = screen.getByTestId(idSettings);
    expect(testSettings).toBeInTheDocument();

    const btnSettings = screen.getByRole('button', {
      name: /config/i,
    });

    expect(btnSettings).toBeInTheDocument();
  });

  it('Teste se é possivel digitar nos inputs', () => {
    renderWithRouterAndRedux(<App />);
    const inputMessage = 'Digitando...';
    const idName = 'input-player-name';
    const idEmail = 'input-gravatar-email';

    const inputName = screen.getByTestId(idName);
    const inputEmail = screen.getByTestId(idEmail);

    userEvent.type(inputName, inputMessage);
    userEvent.type(inputEmail, inputMessage);
  });
});