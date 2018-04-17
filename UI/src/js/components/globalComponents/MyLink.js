import React, {Component} from 'react';
import {Link} from "react-router-dom";

class MyLink extends Component {
    render() {
        return (
            <Link to={this.props.to}>
                <i className={"fa " + this.props.icon}></i>
                {
                    this.props.bold ?
                        <strong>&nbsp;{this.props.label}</strong>
                        :
                        <span>&nbsp;{this.props.label}</span>
                }
            </Link>);
    }
}

export default MyLink;