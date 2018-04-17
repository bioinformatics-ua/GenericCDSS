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
                <div className="collapse navbar-collapse" id="myNavbar">
                    <ul className="nav navbar-nav navbar-right">
                        <LoginComponent/>
                    </ul>
                </div>);

        return (
            <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa fa-users"></i><strong>&nbsp;PACIENTES&nbsp;</strong><span
                            className="caret"></span>
                        </a>
                        <ul className="dropdown-menu user-login" role="menu">
                            <li>
                                <MyLink to="/allpatients" icon="fa-users" label="Todos"/>
                            </li>
                            <li>
                                <MyLink to="/admittedpatients" icon="fa-users" label="Internados"/>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <MyLink to="/protocols" icon="fa-file" bold={true} label="PROTOCOLOS"/>
                    </li>
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                           aria-expanded="false">
                            <i className="fa fa-user"></i> {this.state.user.fullname} <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu user-login" role="menu">
                            <li className="user-details">
                                <strong>Email:</strong><br /> {this.state.user.email}
                                <hr />
                                <strong>último login:</strong><br /> {this.state.user.last_login}
                            </li>
                            <li className="divider"></li>
                            <li>
                                <Link to="/profile"><i className="fa fa-pencil-square-o"></i> Editar perfil</Link>
                            </li>
                            <li>
                                <Link to='/about'><i className="fa fa-info-circle"></i> Sobre</Link>
                            </li>
                            <li>
                                <Link to='/help'><i className="fa fa-question-circle"></i> Ajuda</Link>
                            </li>
                            <li className="divider"></li>
                            <li><a onClick={this.logout}><i className="fa fa-sign-out"></i>
                                Logout</a></li>
                        </ul>
                    </li>
                </ul>
            </div>

        )
    }
}

export default NavigationBar;