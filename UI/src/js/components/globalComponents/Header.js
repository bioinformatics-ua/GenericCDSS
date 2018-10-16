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
        API.GET("settings")
            .then(res => {
                if (this.refs.header)
                    this.setState({appSymbol: res.data["appSymbolSmall"]});
            })
    }

    render() {
        return (
            <div ref="header" id="header" className="Header">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link className="navbar-brand" to="/"><strong>{ReactHtmlParser(this.state.appSymbol)}</strong></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
                            aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <NavigationBar/>
                </nav>
            </div>
        );
    }
}

export default Header;