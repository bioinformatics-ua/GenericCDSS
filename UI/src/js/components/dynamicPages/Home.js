import React from 'react';
import Reflux from 'reflux';
import API from '../../API.js';
import ReactHtmlParser from 'react-html-parser';
import LoginButton from '../globalComponents/LoginComponent.js';
import {UserStore} from '../../reflux/UserReflux.js';

class Home extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = UserStore;
        this.state = {
            home: undefined,
            showDefaultHome: false,
            appSymbol: undefined
        };
    }

    componentDidMount() {
        API.GET("home")
            .then(res => {
                if (this.refs.home)
                    this.setState({home: res.data["home"]});
            });
        API.GET("settings")
            .then(res => {
                this.setState({
                    appSymbol: res.data["appSymbol"],
                    showDefaultHome: res.data["showDefaultHome"]
                });
            });
    }

    render() {
        if (!this.state.showDefaultHome || this.state.user.authenticated)
            return (
                <div ref="home" id="home" className="Home">
                    {ReactHtmlParser(this.state.home)}
                </div>
            );
        return (
            <div className="full-page-image row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4 my-auto">
                    <div className="container card card-block w-25 h-25 d-table-cell align-middle">
                        {this.state.appSymbol}
                        <LoginButton />
                    </div>
                </div>
                <div className="col-sm-4"></div>
            </div>
        );
    }
}

export default Home;