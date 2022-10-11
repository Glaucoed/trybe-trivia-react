import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';
import getQuestions from '../services/questionsAPI';

export default class Game extends Component {
  state = {
    questions: [],
    loading: true,
  };

  async componentDidMount() {
    await this.getStorage();
  }

  getStorage = async () => {
    const token = localStorage.getItem('token');

    const data = await getQuestions(token);
    const { response_code: response } = data;
    const number = 3;
    if (response === number) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({ questions: data.results, loading: false });
  };

  render() {
    const { questions, loading } = this.state;
    return (
      <div>
        <Header />
        {
          loading
            ? <p>Carregando</p>
            : <Questions questions={ questions } />
        }

      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
