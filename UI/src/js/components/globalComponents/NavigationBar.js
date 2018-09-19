import React from 'react';
import Reflux from 'reflux';
import MyLink from "../reusable/MyLink.js";
import {Link} from "react-router-dom";
import LoginComponent from './LoginComponent.js';
import {UserStore, UserActions} from '../../reflux/UserReflux.js';

class NavigationBar extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = UserStore
    }

    logout = event => {
        event.preventDefault();
        UserActions.logout();
    };

    render() {
        if (this.state.authenticated === false)
            return (
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    </ul>

                    <ul className="navbar-nav my-2 my-lg-0">
                        <LoginComponent/>
                    </ul>
                </div>);
        return (
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                </ul>

                <ul className="navbar-nav my-2 my-lg-0">
                    <li className="nav-item my-2 my-sm-0">
                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-users"></i><strong>&nbsp;PATIENTS&nbsp;</strong><span
                            className="caret"></span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <MyLink to="/allpatients" icon="fa-users" label="All"
                                    className="dropdown-item navbar-dropdown-width"/>
                            <MyLink to="/admittedpatients" icon="fa-users" label="Admitted" className="dropdown-item"/>
                        </div>
                    </li>

                    <li className="nav-item dropdown">
                        <MyLink to="/protocols" icon="fa-file" bold={true} label="PROTOCOLS" className="nav-link"/>
                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-user"></i> {this.state.user.fullname} <span className="caret"></span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right user-login">
                            <div className="dropdown-item user-details">
                                <strong>Email:</strong><br /> {this.state.user.email}
                                <hr />
                                <strong>Last login:</strong><br /> {this.state.user.last_login}
                            </div>
                            <div className="dropdown-divider"></div>

                            <Link to="/profile" className="dropdown-item"><i className="fa fa-pencil-square-o"></i> Edit
                                profile</Link>

                            <Link to='/about' className="dropdown-item"><i className="fa fa-info-circle"></i>
                                About</Link>

                            <Link to='/help' className="dropdown-item"><i className="fa fa-question-circle"></i>
                                Help</Link>

                            <div className="dropdown-divider"></div>

                            <a className="dropdown-item" onClick={this.logout}><i className="fa fa-sign-out"></i>
                                Logout</a>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

export default NavigationBar;