import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getTriviaAPI from '../services/triviaAPI';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.handleCheck();
    });
  };

  handleCheck = () => {
    const { name, email } = this.state;
    if (name !== '' && email !== '') {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  // ssad

  handleClick = async () => {
    const { history } = this.props;
    const api = await getTriviaAPI();
    console.log(api);
    localStorage.setItem('token', api.token);
    history.push('/game');
  };

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <div className="main">
        <label htmlFor="name">
          Email:
          <input
            type="text"
            name="name"
            onChange={ this.handleChange }
            value={ name }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          type="button"
          disabled={ isDisabled }
          data-testid="btn-play"
          onClick={ this.handleClick }
        >
          Play
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
};

export default connect()(Login);
