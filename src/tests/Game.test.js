import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Game from '../pages/Game';
import { questionsResponse } from './helpers/gameMock';
import { invalidTokenQuestionsResponse } from '../../cypress/mocks/questions';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history'

global.fetch = jest.fn(questionsResponse)
describe('Teste o componente Game', () => {
  it('Testa game', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });
    renderWithRouterAndRedux(<Game />);
    const category = await screen.findByTestId('question-category')
    expect(category).toBeInTheDocument();
  })

  it('Testa game erro token', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(invalidTokenQuestionsResponse),
    });
    const history = createMemoryHistory()
    renderWithRouterAndRedux(<Game history={history} />);
  })



  it('testa resposta correta', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });
    renderWithRouterAndRedux(<Game />);
    const correctAswer = await screen.findByTestId('correct-answer')
    userEvent.click(correctAswer)
  })


  it('testa resposta incorreta', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });
    renderWithRouterAndRedux(<Game />);
    const incorrectAswer = await screen.findByText('True')
    userEvent.click(incorrectAswer)
  })


  it('testa responder varias vezes', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });
    const history = createMemoryHistory()
    renderWithRouterAndRedux(<Game history={history} />);
    const correctAswer = await screen.findByTestId('correct-answer')
    userEvent.click(correctAswer)
    const nextBtn = await screen.findByTestId('btn-next')
    userEvent.click(nextBtn)
    const newCorrect = await screen.findByTestId('correct-answer')
    userEvent.click(newCorrect)
    const newNext = await screen.findByTestId('btn-next')
    userEvent.click(newNext)
    const thirdCorrect = await screen.findByTestId('correct-answer')
    userEvent.click(thirdCorrect)
    const thirdNext = await screen.findByTestId('btn-next')
    userEvent.click(thirdNext)
    const fortyCorrect = await screen.findByTestId('correct-answer')
    userEvent.click(fortyCorrect)
    const fortyNext = await screen.findByTestId('btn-next')
    userEvent.click(fortyNext)
    const fiveCorrect = await screen.findByTestId('correct-answer')
    userEvent.click(fiveCorrect)
    const fiveNext = await screen.findByTestId('btn-next')
    act(() => userEvent.click(fiveNext))
    expect(history.location.pathname).toBe('/feedback')
  })
  
});
