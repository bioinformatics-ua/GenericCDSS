import React, { Component } from 'react';
import Header from './components/globalComponents/Header.js';
import Footer from './components/globalComponents/Footer.js';
import Routes from './components/globalComponents/Routes.js';
import {BrowserRouter as Router} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <div className="container">
                        <Routes/>
                    </div>
                    <Footer/>
                </div>
            </Router>
        );
    }
}

export default App;
