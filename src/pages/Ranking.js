import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const players = JSON.parse(localStorage.getItem('players'));
    const ordenedPlayers = players.sort((a, b) => b.playerScore - a.playerScore);
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        {
          ordenedPlayers.map((p, index) => (
            <div key={ p.playerName + index }>
              <img alt={ p.playerName } src={ `https://www.gravatar.com/avatar/${p.playerImage}` } />
              <p data-testid={ `player-name-${index}` }>{p.playerName}</p>
              <p data-testid={ `player-score-${index}` }>{p.playerScore}</p>
            </div>
          ))
        }
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Home
          </button>
        </Link>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
    ,
  }).isRequired,
};

export default connect()(Ranking);
