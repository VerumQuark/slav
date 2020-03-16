import React       from 'react';
import { NavLink } from 'react-router-dom';

const navLinkActiveStyle = {
  backgroundColor: 'gray',
};

const Navigation = props => {
  return (
    <nav>
      <ul>
        <li><NavLink exact activeStyle={navLinkActiveStyle} to="/">Text</NavLink></li>
        <li><NavLink activeStyle={navLinkActiveStyle} to="/login">Sign In</NavLink></li>
        <li><NavLink activeStyle={navLinkActiveStyle} to="/signup">Sign Up</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navigation;