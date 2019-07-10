import React from 'react';
import Users from './Users';

export default function User({ users }) {
   return (
      <div className="list">
         {
            users.map(user => <Users key={user.id} user={user} />)
         }
      </div>
   );
}