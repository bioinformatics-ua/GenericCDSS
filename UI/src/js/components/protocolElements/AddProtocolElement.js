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
            selectionType: undefined,
            elementConfigurations: {}
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state && this.state.internalId !== undefined)
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
                        <InquiryElement addElementConfigurations={this.addElementConfigurations}/>
                    );
                case 'decision':
                    return (
                        <DecisionElement addElementConfigurations={this.addElementConfigurations}/>
                    );
                case 'action':
                    return (
                        <ActionElement addElementConfigurations={this.addElementConfigurations}/>
                    );
                default:
                    break;
            }
    };

    addElementConfigurations = (key, value) => {
        let elementConfigurations = this.state.elementConfigurations;
        elementConfigurations[key] = value;
        this.setState({elementConfigurations: elementConfigurations});
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
         * todo: Perform some validations
         * */
        let element = this.buildElementObject();
        this.setState({
            internalId: undefined,
            elementConfigurations: {}
        });
        this.props.addElement(element);
        StateActions.closeModal();
    };

    buildElementObject = () => {
        let element = {
            internalId: this.state.internalId,
            type: this.state.selectionType
        };

        for (let key in this.state.elementConfigurations)
            if (this.state.elementConfigurations.hasOwnProperty(key))
                element[key] = this.state.elementConfigurations[key];

        return element;
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
        /**
         * Function to add element to the protocol
         *
         * @param element
         * */
        addElement: PropTypes.func
    };
}

AddProtocolElement.defaultProps = {
    elementID: 1
};

export default AddProtocolElement;
