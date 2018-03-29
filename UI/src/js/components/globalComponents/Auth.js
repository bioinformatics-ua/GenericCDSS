import API from '../../Axios.js';

const authURL = 'account';

class Auth {//delete this shit
    isAuthenticated: false;

    static authenticate(user, password){
        API.post(authURL + "/login/",  {
            "username": user,
            "password": password
        }).then(res => {
                const authenticated = res.data["authenticated"];
                this.isAuthenticated = authenticated;
                return authenticated;
            })
    }

    static signout(cb) {
        API.post(authURL + "/logout")
            .then(res => {
                const authenticated = res.data["authenticated"];
                this.isAuthenticated = authenticated;
            })
    }
}

export default Auth;