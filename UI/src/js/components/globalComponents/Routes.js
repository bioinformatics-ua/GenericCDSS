import React, {Component} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";

import Home from '../dynamicPages/Home.js';
import Help from '../dynamicPages/Help.js';
import About from '../dynamicPages/About.js';

import AdmittedPatients from '../patient/AdmittedPatients.js';
import AllPatients from '../patient/AllPatients.js';
import ShowPatient from '../patient/ShowPatient.js';
import AddPatient from '../patient/AddPatient.js';

import Protocols from '../protocol/Protocols.js';
import AddProtocol from '../protocol/CRUDProtocol.js';
import ShowProtocol from '../protocol/CRUDProtocol.js';
import AssignProtocolToPatient from '../protocol/AssignProtocolToPatient.js';

import Register from '../accountManager/Register.js';
import Profile from '../accountManager/Profile.js';
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
                <Route path="/profile" component={Profile}/>
                <Route path="/forgotten" component={ForgotPassword}/>
                <Route path="/help" component={Help}/>
                <Route path="/about" component={About}/>

                /*private links*/
                <PrivateRoute authenticated={authenticated} path="/admittedpatients" component={AdmittedPatients}/>
                <PrivateRoute authenticated={authenticated} path="/allpatients" component={AllPatients}/>
                <PrivateRoute authenticated={authenticated} path="/protocols" component={Protocols}/>
                <PrivateRoute authenticated={authenticated} path="/patient/:object" component={ShowPatient}/>
                <PrivateRoute authenticated={authenticated} path="/show/protocol/:object" component={ShowProtocol}/>

                <PrivateRoute authenticated={authenticated} path="/add/patient" component={AddPatient}/>
                <PrivateRoute authenticated={authenticated} path="/add/protocol" component={AddProtocol}/>
                <PrivateRoute authenticated={authenticated} path="/assignprotocol/:object" component={AssignProtocolToPatient}/>

                <Route name="ConnectionRefused" path="/0" component={http0}/>
                <Route name="InternalError" path="/500" component={http500}/>
                <Route name="NotFound" component={http404}/>
            </Switch>
        );
    }
}

export default Routes;