import React from 'react';
import PropTypes from 'prop-types';
import Reflux from 'reflux';
import {StateActions} from '../../reflux/StateReflux.js';
import InquiryElement from '../protocolElements/InquiryElement.js';
import ActionElement from '../protocolElements/ActionElement.js';
import DecisionElement from '../protocolElements/DecisionElement.js';
import DisplayOptionsField from '../reusable/DisplayOptionsField.js';
import DisplayField from '../reusable/DisplayField.js';

class AddProtocolElement extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {
            internalId: this.props.elementID.toString(),
            selectionType: undefined
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state)
            StateActions.updateModal(this.modalHeader(), this.modalContent(), this.modalFooter());
    }

    modalHeader = () => {
        return (
            <div className="">
                <h1>Add protocol element</h1>
            </div>
        );
    };

    modalContent = () => {
        //This is static, because the system only have 3 types os codition and maybe never will be added a new type
        const typeOptions = [
            {value: 'inquiry', label: 'Inquiry'},
            {value: 'decision', label: 'Decision'},
            {value: 'action', label: 'Action'}
        ];

        return (
            <div className="panel-body">
                <DisplayField onChange={this.internalIdHandleChange}
                              label={"Element id"}
                              value={this.state.internalId}
                              type={"number"}
                              min={"0"}/>
                <DisplayOptionsField label={"Element type"}
                                     options={typeOptions}
                                     onChange={this.typeSelectHandleChange}
                                     className={"Selectx3"}/>
                {this.protocolElementConfigurations()}
            </div>
        );
    };

    internalIdHandleChange = (event) => {
        event.preventDefault();
        this.setState({internalId: event.target.value});
    };

    typeSelectHandleChange = (selection) => {
        this.setState({selectionType: selection.value});
    };

    protocolElementConfigurations = () => {
        if (this.state.selectionType)
            switch (this.state.selectionType) {
                case 'inquiry':
                    return (
                        <InquiryElement />
                    );
                case 'decision':
                    return (
                        <DecisionElement />
                    );
                case 'action':
                    return (
                        <ActionElement />
                    );
                default:
                    break;
            }
    };

    modalFooter = () => {
        return (
            <div>
                <button className="btn btn-default btn-100" onClick={this.closeModal}>
                    <i className="fa fa-ban"></i>&nbsp;Cancel
                </button>
                <button className="btn btn-success btn-100" onClick={this.addElement}>
                    <i className="fa fa-plus"></i>&nbsp;Add
                </button>
            </div>
        );
    };

    addElement = () => {
        /**
         * todo
         * Perform some validations
         * add in the protocol list (only front end)
         * close modal
         * */
        StateActions.closeModal();
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
            <button className={"btn btn-success " + this.props.btnClass} onClick={this.openModal}>
                <i className="fa fa-plus"></i>&nbsp;Add element
            </button>
        );
    }

    static propTypes = {
        /**
         * Element id given by the protocol (auto-increment)
         * */
        elementID: PropTypes.number,
    };
}

AddProtocolElement.defaultProps = {
    elementID: 1
};

export default AddProtocolElement;
