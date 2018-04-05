import React, {Component} from 'react';
import Reflux from 'reflux';
import Header from './components/globalComponents/Header.js';
import Footer from './components/globalComponents/Footer.js';
import Routes from './components/globalComponents/Routes.js';
import {Router} from "react-router-dom";
import {UserStore, UserActions} from './reflux/UserReflux.js';
import {StateStore} from './reflux/StateReflux.js';
import History from './components/globalComponents/History.js';

class LoadingBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{textAlign: "center", marginTop: "50px"}}>
                <i id="infiniteloader" className="fa fa-5x fa-spinner fa-spin"></i><br />
                <h3 id="infinitemessage"> <strong>Loading, please wait...</strong></h3>
            </div>);
    }
}

class App extends Reflux.Component {
    constructor(props) {
        super(props);
        this.stores = [StateStore, UserStore];
    }

    componentDidMount() {
        UserActions.getUserData();
    }

    render() {
        if (this.state.loading && this.state.user === undefined)
            return (<LoadingBar/>);

        return (
            <Router history={History}>
                <div>
                    <Header/>
                    <div className="container">
                        <Routes user={this.state.user}/>
                    </div>
                    <Footer/>
                </div>
            </Router>
        );
    }
}

export default App;
