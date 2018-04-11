import Reflux from 'reflux';
import API from '../API.js';
import History from '../components/globalComponents/History.js';

const UserActions = Reflux.createActions(['login', 'logout', 'loginSuccess', 'loginFailed', 'getUserData']);

class UserStore extends Reflux.Store {
    constructor() {
        super();
        this.listenables = UserActions;
        this.state = {
            authenticated: false,
            failed: false,
            user: undefined
        };
    }

    onLogin(user, password, remember) {
        API.POST("account", "login", {
            "username": user,
            "password": password,
            "remember": remember
        }).then(res => {
            UserActions.loginSuccess(res.data, res.data["authenticated"]);
        })
    }

    onGetUserData() {
        API.GET("account", "personalAccountDetails")
            .then(res => {
                this.setState({
                    authenticated: res.data["authenticated"],
                    user: res.data
                });
                this.trigger();
            })
    }

    onLogout() {
        API.GET("account", "logout")
            .then(res => {
                this.setState({authenticated: res.data["authenticated"]});
                History.push('/');
            })
    }

    onLoginSuccess(data, authenticated) {
        if (authenticated === false) {
            UserActions.loginFailed();
        } else {
            this.setState({
                authenticated: authenticated,
                failed: !authenticated,
                user: data
            });
            History.push('/patients');
        }
        this.trigger();
    }

    onLoginFailed() {
        this.setState({failed: true});
        this.trigger();
    }
}

export {UserStore, UserActions};