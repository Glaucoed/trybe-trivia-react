import React, { Component } from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';
import getQuestions from '../services/questionsAPI';

export default class Game extends Component {
  state = {
    questions: [],
    loading: false,
  }

  getStorage = async () => {
    const token = localStorage.getItem('token');
    const data = await getQuestions(token)
    const { results } = data
    this.setState({questions: results,
    loading: true}, () => {
      this.setState({loading: false})
    })
  }

  async componentDidMount () {
    await this.getStorage()
  }
  
  render() {
    const { questions, loading } = this.state
    return (
      <div>
        <Header />
        {
          loading ? <p>Carregando</p>
          :
          <Questions questions={questions}/>
        }
        
      </div>
    );
  }
}
