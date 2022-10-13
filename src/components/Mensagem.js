import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Mensagem extends Component {
  render() {
    const numberFixo = 3;
    const { assertions } = this.props;
    console.log(assertions);
    const verificaResp = assertions < numberFixo;
    return (
      <div>
        { verificaResp
          ? <p data-testid="feedback-text">Could be better...</p>
          : <p data-testid="feedback-text">Well Done!</p>}
      </div>
    );
  }
}

Mensagem.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Mensagem);
