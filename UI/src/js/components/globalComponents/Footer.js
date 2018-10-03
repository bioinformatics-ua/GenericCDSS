import React, {Component} from 'react';
import '../../../css/app.css';
import API from '../../API.js';
import ReactHtmlParser from 'react-html-parser';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            footer: undefined
        };
    }

    componentDidMount() {
        API.GET("settings")
            .then(res => {
                if(this.refs.footer)
                    this.setState({footer:res.data["footer"]});
            })
    }

    render() {
        return (
            <div ref="footer" id="footer" className="Footer">
                <footer>
                    {ReactHtmlParser(this.state.footer)}
                </footer>
            </div>
        );
    }
}

export default Footer;