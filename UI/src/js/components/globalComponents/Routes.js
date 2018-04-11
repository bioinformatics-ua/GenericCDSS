import React, {Component} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";

import Home from '../Home.js';

import Patients from '../patient/Patients.js';
import ShowPatient from '../patient/ShowPatient.js';
import AddPatient from '../patient/AddPatient.js';

import Protocol from '../protocol/Protocol.js';

import Register from '../accountManager/Register.js';
import ForgotPassword from '../accountManager/ForgotPass.js';

import http404 from '../errorPages/http404.js';
import http500 from '../errorPages/http500.js';
import http0 from '../errorPages/http0.js';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        rest.authenticated ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/signinup',
                state: {from: props.location}
            }}/>
        )
    )}/>
);

class Routes extends Component {
    render() {
        if (!this.props.user)
            return (<Redirect to={{pathname: "/signinup"}}/>);

        let authenticated = this.props.user.authenticated;
        return (
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/signinup" component={Register}/>

                /*private links*/
                <PrivateRoute authenticated={authenticated} exact path="/patients" component={Patients}/>
                <PrivateRoute authenticated={authenticated} path="/protocol/:object" component={Protocol}/>
                <PrivateRoute authenticated={authenticated} path="/patient/:object" component={ShowPatient}/>

                <PrivateRoute authenticated={authenticated} path="/add/patient" component={AddPatient}/>

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