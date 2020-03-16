import React          from 'react';
import { withRouter } from 'react-router';
import './SignInPage.scss';
import SignInForm     from '../../components/forms/SignInForm';

const SignInPage = props => {
  return (
    <>
      <SignInForm/>
    </>
  );
};

export default withRouter( SignInPage );