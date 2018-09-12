import React from 'react';
import Reflux from 'reflux';
import {StateActions} from '../../reflux/StateReflux.js';


class AddProtocolElement extends Reflux.Component {
    constructor(props) {
        super(props);
        //this.store = ProtocolStore;
        this.state = {};
    }

    modalHeader = () => {
        return (
            <div className="">
                <h1>todo</h1>
            </div>
        );
    };

    modalContent = () => {
        return (
            <div className="panel-body">
                todo
            </div>
        );
    };

    modalFooter = () => {
        return (<div className="">
                        <button className="btn btn-default btn-100" onClick={this.closeModal}>
                            <i className="fa fa-ban"></i>&nbsp;Cancel
                        </button>
                    </div>);
    };

    openModal = (event) => {
        event.preventDefault();
        StateActions.openModal(this.modalHeader(), this.modalContent(), this.modalFooter());
    };

    closeModal = () => {
        StateActions.closeModal();
    };

    render() {
        return (
            <div className="CVRepresentationGroup-buttons-controler pull-right">
                <button className="btn btn-success btn-100" onClick={this.openModal}>
                    <i className="fa fa-plus"></i>&nbsp;Add condition
                </button>
            </div>
        );
    }
}

export default AddProtocolElement;
