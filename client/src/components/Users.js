import React from 'react';
import { Link } from 'react-router-dom';

export default function Users({ user }) {
   return (
      <div className="user" key={user.id}>
            <Link to={`/users/${user.id}`}>
               {user.name}
            </Link>
      </div>
   );
}