import React, {Component} from 'react';
import Reflux from 'reflux';
import Header from './components/globalComponents/Header.js';
import Footer from './components/globalComponents/Footer.js';
import Routes from './components/globalComponents/Routes.js';
import {Router} from "react-router-dom";
import {UserStore, UserActions} from './reflux/UserReflux.js';
import {StateStore} from './reflux/StateReflux.js';
import History from './components/globalComponents/History.js';
import Modal from 'react-awesome-modal';

class LoadingBar extends Component {
    render() {
        return (
            <div style={{textAlign: "center", marginTop: "50px"}}>
                <i id="infiniteloader" className="fa fa-5x fa-spinner fa-spin"></i><br />
                <h3 id="infinitemessage"><strong>Loading, please wait...</strong></h3>
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

    closeModal = () => {/*To remove the warning*/};

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

                    <Modal
                        visible={this.state.modalVisible}
                        width="50%"
                        height="60%"
                        effect="fadeInUp"
                        onClickAway={this.closeModal}
                    >
                        <div className="modal-header">
                            {this.state.modalHeader === undefined ? '' : this.state.modalHeader}
                        </div>
                        <div className="modal-content">
                            {this.state.modalContent === undefined ? '' : this.state.modalContent}
                        </div>
                        <div className="modal-footer">
                            {this.state.modalFooter === undefined ? '' : this.state.modalFooter}
                        </div>
                    </Modal>

                </div>
            </Router>
        );
    }
}

export default App;
