import React from 'react';
import PropTypes from 'prop-types';
import Reflux from 'reflux';
import {StateActions} from '../../reflux/StateReflux.js';

/**
 * Component to manage the protocol schedules
 *
 * todo finish the creation of this componenet.
 * The idea is to show all the schedules for the protocol, i. e.,
 * when a task action to schedule the protocol is created, in this modal
 * will be shown the decision elements and and the condition that led to the
 * new scheduling.
 * */
class Schedules extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state)
            StateActions.updateModal(this.modalHeader(), this.modalContent(), this.modalFooter());
    }

    modalHeader = () => {
        return (
            <div className="">
                <h1>Schedules</h1>
            </div>
        );
    };

    modalContent = () => {
        return (
            <div className="panel-body">
                Schedules thinking how to solve the problem about the hours vs before bed/meals time
            </div>
        );
    };

    modalFooter = () => {
        return (
            <div>
                <button className="btn btn-default btn-100" onClick={this.closeModal}>
                    <i className="fa fa-ban"></i>&nbsp;Cancel
                </button>
            </div>
        );
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
            <button className="btn btn-info btn-150" onClick={this.openModal}>
                <i className="fa fa-calendar"></i>&nbsp;Show schedules
            </button>
        );
    }

    static propTypes = {};
}

Schedules.defaultProps = {};

export default Schedules;




