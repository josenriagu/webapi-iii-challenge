import React, { Component } from 'react';
import axios from 'axios';

const baseUsersUrl = 'http://localhost:5000/api/users';

export default class User extends Component {
   constructor(props) {
      super(props);
      this.state = {
         posts: []
      }
   }

   fetchUserPosts = () => {
      const id = this.props.match.params.id;
      axios.get(`${baseUsersUrl}/${id}/posts`)
         .then(res => {
            this.setState(state => {
               return {
                  ...state,
                  posts: res.data.posts
               }
            })
         })
   }

   componentDidMount() {
      this.fetchUserPosts();
   }

   render() {
      return (
         this.state.posts.length !== 0
            ?
            <div className="list">
               {
                  this.state.posts.map(post =>
                     <div draggable className="post" key={post.id}>
                        <p>{post.postedBy} posted: <br /><br />{post.text}</p>
                     </div>
                  )
               }
            </div>
            :
            <div className="list"><div className="post">Oops! This user has not made any posts yet</div></div>
      );
   }
}