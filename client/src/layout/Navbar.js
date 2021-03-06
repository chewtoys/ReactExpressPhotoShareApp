import React from 'react';
import {
  Router, Link, Route, Switch,
} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { createBrowserHistory } from 'history';
import SignUp from '../containers/signup';
import Login from '../containers/login';
import Dashboard from '../containers/dashboard';
import Home from '../components/Home';
import PrivateRoute from '../components/PrivateRoute';
export const history = createBrowserHistory({forceRefresh:true});
export default function Navbar(props){
  const logout = (e) => {
    e.preventDefault();
    console.log('test')
    props.userLogOut();
    history.push('/login');
  }
  const authLinks = (
    <span>
      <Button>
        <Link to="/dashboard" color="primary">
            Dashboard
        </Link>
      </Button>
      <Button onClick={logout} to="/">
        <span>Logout</span>
      </Button>
    </span>
  );
  const guestLinks = (
    <span>
      <Button>
        <Link to="/login">
          Login
        </Link>
      </Button>
      <Button>
        <Link to="/signup">
          Sign Up
        </Link>
      </Button>
    </span>
  );
  return(
      <div>
      <Router history={history}>
        <AppBar position="static">
          <Toolbar>
            <Grid justify="space-between" container>
              <Typography variant="h6" style={{ color: '#fff' }}>
                  Image Upload App
              </Typography>
              {/* if is authenticated, will render authlinks
                  if not will render guest links
              */}
              <Grid item>
                <Button align="right">
                  <Link style={{ color: '#fff' }} underline="none" to="/">
                      Home
                  </Link>
                </Button>
                {props.auth.isAuthenticated ? authLinks : guestLinks}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          {' '}
          {/* private routes for users who are authenticated */}
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}