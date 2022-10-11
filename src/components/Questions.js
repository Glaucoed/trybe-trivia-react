import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  state = {
    count: 0,
  };

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
    const { correct_answer: correct } = questions[count];
    if (event.target.innerText === correct) {
      this.setState({ count: count + 1 });
      return console.log('verdade');
    }
    this.setState({ count: count + 1 });
    return console.log('falso');
  };

  render() {
    const { count } = this.state;
    const { questions } = this.props;
    const {
      category,
      question,
      incorrect_answers: incorrect,
      correct_answer: correct,
    } = questions[count];

    const newArray = [...incorrect, correct];
    const arrayAleatorio = this.shuffleArray(newArray);

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
            arrayAleatorio.map((resp, index) => (
              <button
                type="button"
                key={ resp }
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
