import React, {Component} from 'react';
import API from '../../API.js';
import ReactHtmlParser from 'react-html-parser';
import {version} from '../../../../package.json';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            about: undefined
        };
    }

    componentDidMount() {
        API.GET("about")
            .then(res => {
                if(this.refs.about)
                    this.setState({about:res.data["about"]});
            })
    }

    render() {
        return (
            <div ref="about" id="about" className="About">
                <div>
                    <h2 className="mb-3">Version</h2>
                        <p className="mb-3">The current system version is {version}</p>
                </div>
                <div>
                    {ReactHtmlParser(this.state.about)}
                </div>
            </div>
        );
    }
}

export default About;