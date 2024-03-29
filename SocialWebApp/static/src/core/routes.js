import React, {Component} from 'react';
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Login from '../container/login';
import SignUp from '../container/signup';
import WelcomeContainer from '../container/welcome_container';
import Home from '../container/home';
import AddPost from '../container/add_post';
import UserProfileContainer from '../container/userProfile_container'
import App from '../container/test';
import UsersContainer from '../container/users_container';
// import Cookies from 'js-cookie';    
export default class Routes extends Component {
    render() {
        
    return (
        <div>
            <Router>
                <Switch>
                    {/* Looking for userToken */}
                    {/* If userToken is available in local storage than render the required component */}
                    <Route path="/signup" component={SignUp}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route exact path="/" component={WelcomeContainer}></Route>
                    <Route path="/home" render={(props) =>(
                                    localStorage.getItem('userToken') != undefined
                                        ? <Home {...props} />
                                        : <Redirect to='/' />)
                    } />
                    <Route path="/addPost" render={(props) =>(
                                    localStorage.getItem('userToken') != undefined
                                        ? <AddPost {...props} />
                                        : <Redirect to='/' />)
                    } /> 
                    <Route path="/userProfile" render={(props) =>(
                                    localStorage.getItem('userToken') != undefined
                                        ? <UserProfileContainer {...props} />
                                        : <Redirect to='/' />)
                    } /> 
                    <Route path="/users" render={(props) =>(
                                    localStorage.getItem('userToken') != undefined
                                        ? <UsersContainer {...props} />
                                        : <Redirect to='/' />)
                    } />
                </Switch>
            </Router>
        </div>
    )
}
}
