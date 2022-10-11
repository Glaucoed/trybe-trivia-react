import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';
import { submitScore } from '../redux/actions';

class Questions extends React.Component {
  state = {
    count: 0,
    arrayEscolhido: [],
    disabledButton: false,
    questionTimer: 30,
    buttonNextDisabled: false,
  };

  componentDidMount() {
    const { count } = this.state;
    const { questions } = this.props;
    const {
      incorrect_answers: incorrect,
      correct_answer: correct,
    } = questions[count];
    const newArray = [...incorrect, correct];
    const arrayAleatorio = this.shuffleArray(newArray);
    this.setState({ arrayEscolhido: arrayAleatorio });
  }

  shuffleArray = (arr) => {
    for (let index = arr.length - 1; index > 0; index -= 1) {
      const replace = Math.floor(Math.random() * (index + 1));
      [arr[index], arr[replace]] = [arr[replace], arr[index]];
    }
    return arr;
  };

  verificaResp = (event) => {
    const { questions } = this.props;
    const { count } = this.state;
    const {
      correct_answer: correct,
      difficulty,
    } = questions[count];
    if (event.target.innerText === correct) {
      const { dispatch } = this.props;
      const scoreA = (this.score(difficulty));
      dispatch(submitScore(scoreA));
      this.setState({ disabledButton: true,
        buttonNextDisabled: true,
        questionTimer: 'resposta certa' });
      return console.log('verdade');
    }
    this.setState({ disabledButton: true,
      buttonNextDisabled: true,
      questionTimer: 'resposta errada' });
    return console.log('falso');
  };

  changePage = () => {
    const { count } = this.state;
    const { questions, history } = this.props;
    if ( count === 4) {
      history.push("/feedback")
    }
    const {
      incorrect_answers: incorrect,
      correct_answer: correct,
    } = questions[count + 1];
    this.setState(() => {
      const newArray = [...incorrect, correct];
      const arrayAleatorio = this.shuffleArray(newArray);
      this.setState({ arrayEscolhido: arrayAleatorio,
        buttonNextDisabled: false,
        disabledButton: false,
        questionTimer: 30 });
    }, () => {
      this.setState({ count: count + 1 });
    });
  };

  score = (diff) => {
    const { questionTimer } = this.state;
    const ten = 10;
    const tre = 3;
    switch (diff) {
    case 'easy': {
      const thisScoreEasy = ten * (questionTimer * 1);
      return thisScoreEasy;
    }
    case 'medium': {
      const thisScoreMedium = ten * (questionTimer * 2);
      return thisScoreMedium;
    }
    case 'hard': {
      const thisScoreHard = ten * (questionTimer * tre);
      return thisScoreHard;
    }
    default:
      return null;
    }
  };

  timer = () => {
    const { questionTimer } = this.state;
    const number = 1000;
    if (questionTimer > 0) {
      setTimeout(() => {
        this.setState((prevState) => ({
          questionTimer: prevState.questionTimer - 1,
        }));
      }, number);
    }
    if (questionTimer === 0) {
      this.setState({ disabledButton: true,
        questionTimer: 'acabou o tempo' });
    }
  };

  render() {
    this.timer();
    const { count, disabledButton, questionTimer,
      arrayEscolhido, buttonNextDisabled } = this.state;
    const { questions } = this.props;
    const {
      category,
      question,
      correct_answer: correct,
    } = questions[count];

    return (
      <div>
        <div data-testid="question-category">
          {category}
        </div>
        <div data-testid="question-text">
          {question}
        </div>
        <div data-testid="answer-options">
          {
            arrayEscolhido.map((resp, index) => (
              <button
                type="button"
                disabled={ disabledButton }
                key={ resp }
                className={ resp === correct
                  ? 'correct'
                  : 'wrong' }
                onClick={ (event) => this.verificaResp(event) }
                data-testid={ resp === correct
                  ? 'correct-answer'
                  : `wrong-answer-${index}` }
              >
                {resp}
              </button>
            ))
          }
        </div>
        <p>{questionTimer}</p>
        {
          buttonNextDisabled
          && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ () => this.changePage() }
            >
              Next
            </button>
          )
        }
      </div>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    correct_answer: PropTypes.string,
    difficulty: PropTypes.string.isRequired,
    history: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Questions);
