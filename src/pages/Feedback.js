import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import Mensagem from '../components/Mensagem';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    const numberFixo = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {assertions < numberFixo ? 'Could be better...' : 'Well Done!'}
        </p>
        <p data-testid="feedback-total-score">
          {score}
        </p>
        <p data-testid="feedback-total-question">
          {assertions}
        </p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Play Again
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,

};

const mapStateToProps = (state) => ({
  assertions: state,
  score: state.score,
});

export default connect(mapStateToProps)(Feedback);
