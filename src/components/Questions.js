import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';

class Questions extends React.Component {
  state = {
    count: 0,
    arrayEscolhido: [],
    disabledButton: false,
    questionTimer: 30,
  };

  shuffleArray = (arr) => {
    for (let index = arr.length - 1; index > 0; index -= 1) {
      const replace = Math.floor(Math.random() * (index + 1));
      [arr[index], arr[replace]] = [arr[replace], arr[index]];
    }
    return arr;
  };

  componentDidMount() {
    const { count, disabledButton, questionTimer } = this.state;
    const { questions } = this.props;
    const {
      category,
      question,
      incorrect_answers: incorrect,
      correct_answer: correct,
    } = questions[count];
    const newArray = [...incorrect, correct];
    const arrayAleatorio = this.shuffleArray(newArray);
    this.setState({arrayEscolhido: arrayAleatorio}, () => {
      console.log(this.state.arrayEscolhido)
    })
  }

  verificaResp = (event) => {
    const { questions } = this.props;
    const { count } = this.state;
    const {
      category,
      question,
      incorrect_answers: incorrect,
      correct_answer: correct,
      difficulty: difficulty,
    } = questions[count];
    if (event.target.innerText === correct) {
      console.log(difficulty)
      console.log(this.score(difficulty))
      this.setState({disabledButton: true,
      questionTimer: "resposta certa"})
      return console.log('verdade');
    }
    this.setState({disabledButton: true,
    questionTimer: "resposta errada"})
    return console.log('falso');
  };

  score = (diff) => {
    const { questionTimer } = this.state
    switch (diff) {
      case 'easy':
        const thisScoreEasy= 10 * (questionTimer * 1)
        return thisScoreEasy
      case 'medium':
        const thisScoreMedium = 10 * (questionTimer * 2)
        return thisScoreMedium
      case 'hard':
        const thisScoreHard = 10 * (questionTimer * 3)
        return thisScoreHard
      default :
        null
    }
    
  }
  

  timer = () => {
    const { questionTimer } = this.state
    const number = 1000
    if ( questionTimer > 0) {
      setTimeout(() => {
        this.setState( (prevState) => ({
          questionTimer: prevState.questionTimer - 1
        }))       
      }, number)
    }
    if (questionTimer === 0 ) {
      this.setState({disabledButton: true,
      questionTimer: 'acabou o tempo'})
    }
  }

  render() {
    this.timer()
    const { count, disabledButton, questionTimer, arrayEscolhido } = this.state;
    const { questions } = this.props;
    const {
      category,
      question,
      incorrect_answers: incorrect,
      correct_answer: correct,
      difficulty: difficulty
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
  }).isRequired).isRequired,
};

export default connect()(Questions);
