import React, {Component} from 'react';
import {Link} from "react-router-dom";

class MyLink extends Component {
    render() {
        return (
            <Link to={this.props.to}>
                <i className={"fa " + this.props.icon}></i>
                <strong>&nbsp;{this.props.label}</strong>
            </Link>);
    }
}

export default MyLink;