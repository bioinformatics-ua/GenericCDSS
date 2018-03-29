import React, {Component} from 'react';
import Reflux from 'reflux';
import {Route, Switch, Redirect} from "react-router-dom";
import Content from '../Content.js';
import Home from '../Home.js';
import Protocol from '../protocol/Protocol.js';
import Register from '../accountManager/Register.js';
import ForgotPassword from '../accountManager/ForgotPass.js';
import http404 from '../errorPages/http404.js';
import http500 from '../errorPages/http500.js';
import http0 from '../errorPages/http0.js';
import Auth from '../globalComponents/Auth.js';
import {UserStore} from '../../reflux/UserReflux.js';

/*
const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            fakeAuth.isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: {from: props.location}
                    }}
                />
            )
        }
    />
);*/

class Routes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/signinup" component={Register}/>

                /*private links*/
                <Route exact path="/home" component={Content}/>
                <Route path="/protocol/:object" component={Protocol}/>

                <Route path="/signinup" component={Register}/>
                <Route path="/forgotten" component={ForgotPassword}/>

                <Route name="ConnectionRefused" path="/0" component={http0}/>
                <Route name="InternalError" path="/500" component={http500}/>
                <Route name="NotFound" component={http404}/>
            </Switch>
        );
    }
}

export default Routes;