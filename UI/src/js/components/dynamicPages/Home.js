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
        let styles = {
            backgroundImage: 'url(images/home_wallpaper.jpg)',
            backgroundSize: 'cover',
            overflow: 'hidden',
            opacity: 0.5
        };

        if (!this.state.showDefaultHome || this.state.user.authenticated)
            return (
                <div ref="home" id="home" className="Home">
                    {ReactHtmlParser(this.state.home)}
                </div>
            );
        return (
            <div className="container row h-100">
                <div className="col-sm-3"></div>
                <div className="col-sm-6 h-100 d-table">
                    <div className="container card card-block d-table-cell align-middle">
                        <center><h1>{this.state.appSymbol}</h1></center>
                        <LoginButton />
                    </div>
                </div>
                <div className="col-sm-3"></div>
            </div>
        );
    }
}

export default Home;