import './App.css';
import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import {bindActionCreators, compose} from 'redux';
import {connect} from "react-redux";

import * as ROUTES from "constants/routes";
import { Login } from 'modules/Authentication';
import Layout from "./Layout";
import {isUserAuthenticated} from "helper/login-helper";

import {getAuthenticated, getAuthenticationError, getLoading} from "./redux/app/selectors";
import {authenticate, clearAfterAuthentication} from "./redux/app";

const mapStateToProps = (state, props) => {
  return {
    authenticated: getAuthenticated(state) || isUserAuthenticated(),
    loading: getLoading(state),
    error: getAuthenticationError(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const actions = {
    authenticate: bindActionCreators(authenticate, dispatch),
    clear: bindActionCreators(clearAfterAuthentication, dispatch),
  };
  return {actions};
};

const LoginComponent = compose(
  connect(mapStateToProps,mapDispatchToProps),
)(Login);

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.LOGIN}>
          <LoginComponent />
        </Route>
        <Route path='/' component={Layout} />
      </Switch>
      {/*TODO() -> connect hooks instead of redux
      TODO() https://medium.com/octopus-labs-london/replacing-redux-with-react-hooks-and-context-part-1-11b72ffdb533
      app.loading && (
          <div
              style={{
                position: 'fixed',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                zIndex: '1202',
                top: 0,
                backgroundColor: 'rgba(0,0,0, 0.6)',
              }}
          >
            <CircularProgress color='secondary' size={80} />
          </div>
      )*/}
    </Router>
  );
}

export default App;
