import React          from 'react';
import { withRouter } from 'react-router';
import './SignUpPage.scss';
import SignUpForm     from '../../components/forms/SignUpForm';

const SignUpPage = (props) => {

  return (
    <div>
      <h1>Sign Up Page.</h1>
      <SignUpForm/>
    </div>
  );
};

export default withRouter( SignUpPage );