import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  handleHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
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
