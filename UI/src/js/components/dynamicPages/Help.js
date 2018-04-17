import React, {Component} from 'react';
import API from '../../API.js';
import ReactHtmlParser from 'react-html-parser';

class Help extends Component {
    constructor(props) {
        super(props);
        this.state = {
            help: undefined
        };
    }

    componentDidMount() {
        API.GET("help")
            .then(res => {
                if(this.refs.help)
                    this.setState({help:res.data["help"]});
            })
    }

    render() {
        return (
            <div ref="help" id="help" className="help">
                    {ReactHtmlParser(this.state.help)}
            </div>
        );
    }
}

export default Help;