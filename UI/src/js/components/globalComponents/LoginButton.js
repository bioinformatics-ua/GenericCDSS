import React, {Component} from 'react';
import LoginComponent from './LoginComponent.js';
import API from '../../API.js';

class LoginButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDefaultHome: false
        };
    }

    componentDidMount(){
        API.GET("settings")
            .then(res => {
                this.setState({showDefaultHome:res.data["showDefaultHome"]});
            });
    }

    render() {
        if(this.state.showDefaultHome)
            return (<span></span>);
        return (
            <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button"
                   aria-expanded="false">
                    <i className="fa fa-user"></i> LOGIN <span className="caret"></span>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                    <LoginComponent />
                </div>
            </div>
        );
    }
}

export default LoginButton;