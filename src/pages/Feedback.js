import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Mensagem from '../components/Mensagem';
import Header from '../components/Header';
import ResultsTotal from '../components/ResultsTotal';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <Mensagem />
        <ResultsTotal />
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

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
