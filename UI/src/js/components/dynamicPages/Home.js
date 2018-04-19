import React, {Component} from 'react';
import API from '../../API.js';
import ReactHtmlParser from 'react-html-parser';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            home: undefined
        };
    }

    componentDidMount() {
        API.GET("home")
            .then(res => {
                if(this.refs.home)
                    this.setState({home:res.data["home"]});
            })
    }

    render() {
        return (
            <div ref="home" id="home" className="Home">
                    {ReactHtmlParser(this.state.home)}
            </div>
        );
    }
}

export default Home;