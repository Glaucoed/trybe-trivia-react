import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Mensagem from '../components/Mensagem';
import Header from '../components/Header';
import ResultsTotal from '../components/ResultsTotal';

class Feedback extends Component {
  componentDidMount() {
    const { name, score, email } = this.props;
    const actualPlayers = localStorage.getItem('players')
      ? JSON.parse(localStorage.getItem('players')) : [];
    console.log(email);
    const storageImage = md5(email).toString();
    const newPlayers = [
      ...actualPlayers,
      {
        playerImage: storageImage,
        playerName: name,
        playerScore: score,
      },
    ];
    localStorage.setItem('players', JSON.stringify(newPlayers));
  }

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
            onClick={ this.handleClick }
          >
            Ranking
          </button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
  name: state.user.name,
  email: state.user.email,
});

export default connect(mapStateToProps)(Feedback);
