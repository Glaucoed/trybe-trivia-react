import React, { Component } from 'react';
import { connect } from 'react-redux';
import Mensagem from '../components/Mensagem';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Mensagem />
      </div>
    );
  }
}

export default connect()(Feedback);
