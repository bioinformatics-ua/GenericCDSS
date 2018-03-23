import React, {Component} from 'react';
import {Route, Link} from "react-router-dom";
import Content from './Content.js';
import Protocol from './protocol/Protocol.js';

class Routes extends Component {
    render() {
        return (
            <span>
                <Route exact path="/home" component={Content}/>
                <Route path="/protocol/:object" component={Protocol}/>
            </span>
        );
    }
}

export default Routes;