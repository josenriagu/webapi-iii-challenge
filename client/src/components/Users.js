import React from 'react';

export default function Users ({ user }) {
   return (
      <div className="user" key={user.id}>{user.name}</div>
   );
}