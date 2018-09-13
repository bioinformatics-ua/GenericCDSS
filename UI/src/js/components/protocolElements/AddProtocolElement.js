import React from 'react';
import Reflux from 'reflux';
import {StateActions} from '../../reflux/StateReflux.js';
import Select from 'react-select';
import InquiryElement from '../protocolElements/InquiryElement.js';
import ActionElement from '../protocolElements/ActionElement.js';
import DecisionElement from '../protocolElements/DecisionElement.js';
import DisplayOptionsField from '../reusable/DisplayOptionsField.js';

class AddProtocolElement extends Reflux.Component {
    constructor(props) {
        super(props);
        //this.store = ProtocolStore;
        this.state = {
            selectionType: undefined
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectionType !== this.state.selectionType)
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
                {/*Internal id*/}
                {/*mudar o select para um diplay options field*/}

                {/*<Select*/}
                    {/*placeholder={"Please chose the protocol element type"}*/}
                    {/*className="Select"*/}
                    {/*name="form-field-name"*/}
                    {/*value={this.state.selectionType}*/}
                    {/*onChange={this.typeSelectHandleChange}*/}
                    {/*options={typeOptions}/>*/}

                <DisplayOptionsField label={"Element type"}
                                     options={typeOptions}
                                     onChange={this.typeSelectHandleChange}/>
                {this.protocolElementConfigurations()}
            </div>
        );
    };

    typeSelectHandleChange = (selection) => {
        this.setState({selectionType: selection.value});
    };

    protocolElementConfigurations = () => {
        /**
         * Switch depois do lanche com os 3 protocol types
         */
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
        return (<div>
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
            <button className={"btn btn-success " + this.props.btnClass} onClick={this.openModal}>
                <i className="fa fa-plus"></i>&nbsp;Add element
            </button>
        );
    }
}

export default AddProtocolElement;
