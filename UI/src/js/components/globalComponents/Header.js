import React, {Component} from 'react';
import {Link} from "react-router-dom";
import NavigationBar from './NavigationBar.js';
import API from '../../API.js';
import ReactHtmlParser from 'react-html-parser';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appSymbol: ""
        };
    }

    componentDidMount() {
        API.GET("header")
            .then(res => {
                if (this.refs.header)
                    this.setState({appSymbol: res.data["appSymbol"]});
            })
    }

    render() {
        return (
            <div ref="header" className="Header">
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse"
                                    data-target="#myNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link className="navbar-brand" to="/">{ReactHtmlParser(this.state.appSymbol)}</Link>
                        </div>
                        <NavigationBar/>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;