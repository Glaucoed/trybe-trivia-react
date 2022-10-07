import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const numberFixo = 3;
    const { respostas } = this.props;
    const verificaResp = respostas < numberFixo;
    return (
      <div>
        { verificaResp
          ? <p data-testid="feedback-text">Could be better...</p>
          : <p data-testid="feedback-text">Well Done!</p>}
      </div>
    );
  }
}

Feedback.propTypes = {
  respostas: PropTypes.number.isRequired,

};

const mapStateToProps = (state) => ({
  respostas: state,
});

export default connect(mapStateToProps)(Feedback);
