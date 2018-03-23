import React, { Component } from 'react';
import '../css/app.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Routes from './components/Routes.js';
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
