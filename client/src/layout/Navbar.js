import React, {Component} from "react";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import PrivateRoute from '../components/PrivateRoute';
import Home from '../components/Home';
import Dashboard from '../components/Dashboard';
import {connect} from 'react-redux';
import Login from '../components/Login';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {logoutUser} from '../actions/authActions';
import SignUp from "../components/SignUp";
import Grid from '@material-ui/core/Grid';

class Navbar extends Component {
    logout = (e) => {
        e.preventDefault();
        this.props.logoutUser();

    }
    render() {
        // LINKS
        const authLinks = (
            <span>
                <Button>
                    <Link to="/dashboard" color="primary">
                        Dashboard
                    </Link>
                </Button>       
                <Button onClick={this.logout} to="/">
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
        return (
            <div>
                <BrowserRouter>
          
                    <AppBar position="static">
                        <Toolbar>
                        <Grid justify="space-between" container >
                            <Typography variant="h6" style={{ color: '#fff'}}>
                               Image Upload App
                            </Typography>                         
                    
                             {/* if is authenticated, will render authlinks 
                                if not will render guest links
                            */}
                            <Grid item>
                                <Button align="right">
                                    <Link style={{ color:'#fff'}} underline="none" to="/">
                                        Home
                                    </Link>
                                </Button>
                                 {this.props.auth.isAuthenticated ? authLinks : guestLinks}

                            </Grid>
              
                       
                           
                              
                        </Grid>
                        </Toolbar>
                    </AppBar>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/signUp" component ={SignUp}/>
                        <Route exact path="/login" component={Login}/> {/* private routes for users who are authenticated */}
                        <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
                        
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser())
})
const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps,mapDispatchToProps)(Navbar)