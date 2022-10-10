import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;
    const hash = md5(email).toString();
    return (
      <div>
        <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt={ `Foto da pessoa ${name}` } />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
  score: state.game.score,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
