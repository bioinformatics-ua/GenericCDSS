import React, {Component} from 'react';
import {Link} from "react-router-dom";
import NavigationBar from './NavigationBar.js';
import API from '../../Axios.js';
import ReactHtmlParser from 'react-html-parser';

const headerURL = 'utils/header';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appSymbol: ""
        };
    }

    componentDidMount() {
        API.get(headerURL)
            .then(res => {
                const appSymbol = res.data["appSymbol"];
                this.setState({appSymbol});
            })
    }

    render() {
        return (
            <div className="Header">
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
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