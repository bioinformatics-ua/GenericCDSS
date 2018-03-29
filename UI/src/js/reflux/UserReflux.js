import Reflux from 'reflux';
import API from '../Axios.js';

const authURL = 'account';
const UserActions = Reflux.createActions(['login', 'logout', 'loginSuccess', 'loginFailed']);

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
        API.post(authURL + "/login/",  {
            "username": user,
            "password": password,
            "remember":remember
        }).then(res => {

                console.log(res)
                const authenticated = res.data["authenticated"];
                const token = res.config.headers["csrftoken"];
                UserActions.loginSuccess(res.data, authenticated, token);
            })
    }

    onLogout() {
        API.get(authURL + "/logout/")
            .then(res => {
                const authenticated = res.data["authenticated"];
                this.setState({authenticated: authenticated});
            })
    }

    onLoginSuccess(data, authenticated, token){
        if(authenticated === false){
            UserActions.loginFailed();
        } else {
            sessionStorage.setItem('token', token);
            this.setState({
                    authenticated: authenticated,
                    failed: !authenticated,
                    user: data
                });
        }
        this.trigger();
    }

    onLoginFailed(){
        this.setState({failed: true});
        this.trigger();
    }
}

export {UserStore, UserActions};