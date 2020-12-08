import React from 'react';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <div>
      <h1>
        Welcome to Our Chat
        <span role="img" aria-label="emoji">💬</span>
      </h1>
      <h2>
        <span role="img" aria-label="emoji">❤️</span>
      </h2>
      <h2>
        Try it out right now!
        <span role="img" aria-label="emoji">⬅️</span>
      </h2>
    </div>
  </div>
);

export default TextContainer;
