import React, { Component } from 'react';
import { connect } from 'react-redux';
import Mensagem from '../components/Mensagem';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <Mensagem />
      </div>
    );
  }
}

export default connect()(Feedback);
