import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './pages/Login';
import Settings from './components/Settings';
import Game from './pages/Game';
import Feedback from './pages/Feedback';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Settings } />
        <Route path="/game" component={ Game } />
        <Route path="/feedback" component={ Feedback }/>
      </Switch>
    );
  }
}
export default connect()(App);
