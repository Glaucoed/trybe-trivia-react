import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './pages/Login';
import Settings from './components/Settings';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    );
  }
}

export default connect()(App);
