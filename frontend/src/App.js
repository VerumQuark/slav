import React, { Component, lazy, Suspense }       from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { THEME_MODE }                             from './constants/enums.js';

const SignUpPage = lazy( () => import( './pages/SignUpPage/SignUpPage.js' ) );
const SignInPage = lazy( () => import( './pages/SignInPage/SignInPage.js' ) );
const HomePage = lazy( () => import( './pages/HomePage.js' ) );

const fallbackElem = <div className='loader'>Loading...</div>;

export const AppContext = React.createContext( {} );

class App extends Component {

  state = {
    theme: THEME_MODE.LIGHT,
  };

  changeTheme = () => {
    this.setState( state => ({
      theme: state.theme === THEME_MODE.LIGHT
             ? THEME_MODE.DARK
             : THEME_MODE.LIGHT,
    }) );
  };

  render () {

    const contextValue = {
      state: this.state,
      changeTheme: this.changeTheme
    };

    return (
      <AppContext.Provider value={contextValue}>
        <Router>
          <Suspense fallback={fallbackElem}>
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route path={['/signup', '/sign_up']} component={SignUpPage}/>
              <Route path={['/signin', '/sign_in', '/login']} component={SignInPage}/>
            </Switch>
          </Suspense>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;
