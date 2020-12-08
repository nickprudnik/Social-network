import React from 'react';
import md5 from 'js-md5';

export default ({ user, width = '' }) => (
  <>
    {user.avatarUrl
        && (
        <img
          src={`http://localhost:3000/${user.avatarUrl}`}
          className="rounded-circle post-image"
          alt={user.name}
          width={width}
        />
        )}

    {!user.avatarUrl
        && (
        <img
          src={`http://gravatar.com/avatar/${md5(user.email)}`}
          className="rounded-circle post-image"
          alt={user.name}
          width={width}
        />
        )}
  </>
);
