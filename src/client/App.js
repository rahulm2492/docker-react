import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import ShowData from './showData';
import './app.css';

export default class App extends Component {
  state = { user: null };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ user: JSON.parse(user.userDetails) }));
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        {user ? <h1>{`hello ${user.username}`}</h1> : <h1>Loading.. please wait!</h1>}
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Navbar} />
            <Route
              path="/callback"
              render={props => <ShowData {...props} />}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
