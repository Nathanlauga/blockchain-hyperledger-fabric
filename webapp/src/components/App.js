import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';

// Styles
import '../assets/css/app.min.css';

// Components
import Signup from '../components/signup';
import Login from '../components/login';

import Home from '../components/home';

class App extends Component {
  constructor(props) {
    super(props);
    this._notificationSystem = null;
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  componentDidUpdate() {
    let notif = this.props.notif;
    this._notificationSystem.addNotification(notif);
  }

  render() {
    return (
      <div className="App">
        <NotificationSystem ref="notificationSystem" />
        <Router>
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />

            <Route exact path="/users/home" component={Home} />
          </Switch>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { notif: state.notif.event };
}

App = connect(mapStateToProps, null)(App);

export default App;
