import React, {Component} from 'react';
import '../../../css/app.css';
import API from '../../Axios.js';
import ReactHtmlParser from 'react-html-parser';

const footerURL = 'utils/footer';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            footer: ""
        };
    }

    componentDidMount() {
        API.get(footerURL)
            .then(res => {
                const footer = res.data["footer"];
                this.setState({footer});
            })
    }

    render() {
        return (
            <div className="Footer">
                <footer>
                    {ReactHtmlParser(this.state.footer)}
                </footer>
            </div>
        );
    }
}

export default Footer;