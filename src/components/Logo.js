import React from 'react';

function Logo(props) {
  return (
    <img
      alt="Logo"
      src="/static/images/avatars/coronavirus.png"
      {...props}
    />
  );
}

export default Logo;
