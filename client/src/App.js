import React, { Component } from 'react';
import axios from 'axios';
import Users from './components/Users';
import './App.css';

const baseUsersUrl = 'http://localhost:5000/api/users';
const basePostsUrl = 'http://localhost:5000/api/posts';

export default class App extends Component {
  state = {
    users: [],
    posts: []
  }

  fetchUsers = () => {
    axios.get(baseUsersUrl)
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
    axios.get(basePostsUrl)
      .then(res => {
        this.setState(state => {
          return {
            ...state,
            posts: res.data.posts
          }
        })
        
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        console.log(this.state)
      })
  }

  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    return (
      <div className="app">
        {
          this.state.users.map(user => <Users key={user.id} user={user} />)
        }
      </div>
    );
  }
}