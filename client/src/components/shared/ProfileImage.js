import React from 'react';
import md5 from 'js-md5';

export default ({ user, width = '' }) => (
  <>
    {user.avatarUrl
        && (
        <img
          src={`${process.env.REACT_APP_ENDPOINT}/${user.avatarUrl}`}
          className="rounded-circle user-image"
          alt={user.name}
          width={width}
        />
        )}

    {!user.avatarUrl
        && (
        <img
          src={`http://gravatar.com/avatar/${md5(user.email)}`}
          className="rounded-circle user-image"
          alt={user.name}
          width={width}
        />
        )}
  </>
);
