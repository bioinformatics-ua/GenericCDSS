import React from 'react';
import Reflux from 'reflux';
//import {Link} from "react-router-dom";
import {UserStore, UserActions} from '../../reflux/UserReflux.js';

class LoginComponent extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = UserStore;
    }

    login = event => {
        event.preventDefault();
        if (this.refs.usr !== "" && this.refs.pwd !== "") {
            let username = this.refs.usr.value.trim();
            let password = this.refs.pwd.value.trim();
            let remember = this.refs.rmb.checked;
            UserActions.login(username, password, remember);
        }
    };

    render() {
        return (
            <div className="li-login">
                <form className="form-signin" onSubmit={this.login}>
                    <input name="username" ref="usr" type="text" className="form-control"
                           placeholder="Email" required autoFocus/>
                    <input name="password" ref="pwd" type="password" className="form-control"
                           placeholder="Password" required/>

                    {this.state.failed ? (
                        <div className="alert alert-danger" role="alert">Login failed</div>) : ''}

                    <button
                        className="btn btn-sm btn-primary btn-block"
                        type="submit"><i className="fa fa-sign-in"></i> &nbsp;Sign in
                    </button>
                    <div className="need-help">
                        <label className="pull-left">
                            <input defaultChecked="true" ref="rmb" name="remember_me" type="checkbox"
                                   value="remember-me"/>
                            Remember me
                        </label>
                        {/*<Link className="pull-right" to="forgotten">Forgot password ?</Link>*/}
                    </div>
                </form>
                <br/>
                {/*<Link to="signinup" className="btn btn-outline-link btn-block"> Create an account </Link>*/}
            </div>
        );
    }
}

export default LoginComponent;