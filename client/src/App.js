import React, { Component } from 'react';
import axios from './axios';
import { Route, Link } from 'react-router-dom';
import UsersList from './components/UsersList';
import User from './components/User';
import './App.css';

export default class App extends Component {
  state = {
    users: [],
  }

  fetchUsers = () => {
    axios.get('/users')
      .then(res => {
        this.setState(state => {
          return {
            ...state,
            users: res.data.users
          }
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    return (
      <div className="app">
        <Link to="/"><button>Home</button></Link>
        <Route
          exact          
          path="/"
          render={props => <UsersList {...props} users={this.state.users} /> }
        />
        <Route
          path="/users/:id"
          render={props => <User {...props} posts={this.state.posts} />}
        />
      </div>
    );
  }
}