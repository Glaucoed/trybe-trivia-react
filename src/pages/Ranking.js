import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  handleHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  crecentOrder = (arr) => {
    console.log(arr);
    const scoreArr = [];
    const finalArr = [];
    arr.forEach((p) => {
      scoreArr.push(p.playerScore);
    });
    const ordenedScore = scoreArr.sort((a, b) => {
      const NEGATIVEONE = -1;
      if (a > b) return NEGATIVEONE;
      if (a < b) return 1;
      return 0;
    });
    ordenedScore.forEach((s) => {
      arr.forEach((i) => {
        if (i.playerScore === s) {
          finalArr.push(i);
        }
      });
    });
    return finalArr;
  };

  render() {
    const players = JSON.parse(localStorage.getItem('players'));
    const ordenedPlayers = this.crecentOrder(players);
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        {
          ordenedPlayers.map((p, index) => {
            console.log(index);
            return (
              <div key={ p.playerName + index }>
                <img alt="playerImage" src={ `https://www.gravatar.com/avatar/${p.playerImage}` } />
                <h1 data-testid={ `player-name-${index}` }>{p.playerName}</h1>
                <p data-testid={ `player-score-${index}` }>{p.playerScore}</p>
              </div>
            );
          })
        }
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ () => this.handleHome() }
        >
          Home

        </button>
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
