import React, {Component} from 'react';
import API from '../../API.js';
import ReactHtmlParser from 'react-html-parser';

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
                    {ReactHtmlParser(this.state.about)}
            </div>
        );
    }
}

export default About;