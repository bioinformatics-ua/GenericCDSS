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
            elementConfigurations: {},
            elementData: this.props.getElementData !== undefined ? this.props.getElementData(this.props.elementID) : undefined,
            mode: this.props.getElementData !== undefined ? "edit": "new",

            //This is static, because the system only have 3 types os codition and maybe never will be added a new type
            typeOptions:[
                {value: 'inquiry', label: 'Inquiry'},
                {value: 'decision', label: 'Decision'},
                {value: 'action', label: 'Action'}
            ]
        };
    }

    loadDetails = () => {
        if(this.state.mode === "edit"){
            let selectionType = this.state.typeOptions.find(obj => {
                return obj.value === this.state.elementData.type;
            });

            this.setState({
                selectionType: selectionType,
                internalId: this.state.elementData.internalId
            });
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state)
            StateActions.updateModal(this.modalHeader(), this.modalContent(), this.modalFooter());
    }

    /*******************************************************************************************************************
     * Auxiliary functions
     ******************************************************************************************************************/
    internalIdHandleChange = (event) => {
        event.preventDefault();
        let elementData = this.state.elementData;

        if(elementData)
            elementData["internalId"] = event.target.value;

        this.setState({
            internalId: event.target.value,
            elementData: elementData
        });
    };

    typeSelectHandleChange = (selection) => {
        this.setState({
            selectionType: selection,
            elementData: {}
        });
    };

    protocolElementConfigurations = () => {
        if (this.state.selectionType)
            switch (this.state.selectionType.value) {
                case 'inquiry':
                    return (
                        <InquiryElement addElementConfigurations={this.addElementConfigurations}
                                        elementData={this.state.elementData}
                                        mode={this.state.mode}/>
                    );
                case 'decision':
                    return (
                        <DecisionElement addElementConfigurations={this.addElementConfigurations}
                                         elementData={this.state.elementData}
                                         mode={this.state.mode}/>
                    );
                case 'action':
                    return (
                        <ActionElement addElementConfigurations={this.addElementConfigurations}
                                       elementData={this.state.elementData}
                                       mode={this.state.mode}/>
                    );
                default:
                    break;
            }
    };

    addElementConfigurations = (key, value) => {
        let elementConfigurations = this.state.elementConfigurations;
        elementConfigurations[key] = value;

        let elementData = this.state.elementData;

        if(elementData)
            elementData[key] = value;

        this.setState({
            elementConfigurations: elementConfigurations,
            elementData: elementData
        });
    };

    addElement = () => {
        /**
         * todo: Perform some validations
         * */
        let element = this.buildElementObject();
        this.closeModal();
        this.props.onClick(element);
    };

    buildElementObject = () => {
        let element = {
            internalId: this.state.internalId,
            type: this.state.selectionType.value
        };

        for (let key in this.state.elementConfigurations)
            if (this.state.elementConfigurations.hasOwnProperty(key))
                element[key] = this.state.elementConfigurations[key];

        return element;
    };

    /*******************************************************************************************************************
     * Modal actions
     ******************************************************************************************************************/
    modalHeader = () => {
        return (
            <div className="">
                <h1>Add protocol element</h1>
            </div>
        );
    };

    modalContent = () => {
        return (
            <div className="card-body">
                <DisplayField onChange={this.internalIdHandleChange}
                              label={"Element id"}
                              value={this.state.internalId}
                              type={"number"}
                              min={"0"}
                              className={"mb-3"}/>
                <DisplayOptionsField label={"Element type"}
                                     options={this.state.typeOptions}
                                     onChange={this.typeSelectHandleChange}
                                     selection={this.state.selectionType}
                                     className={"mb-3"}
                                     selectClassName={"Selectx3"}/>
                {this.protocolElementConfigurations()}
            </div>
        );
    };

    modalFooter = () => {
        return (
            <div>
                <button className="btn btn-sm btn-default btn-100" onClick={this.closeModal}>
                    <i className="fa fa-ban"></i>&nbsp;Cancel
                </button>
                <button className="btn btn-sm btn-success btn-100" onClick={this.addElement}>
                    <i className="fa fa-plus"></i>&nbsp;Add
                </button>
            </div>
        );
    };

    openModal = (event) => {
        this.loadDetails();
        StateActions.openModal(this.modalHeader(), this.modalContent(), this.modalFooter());
    };

    closeModal = () => {
        this.setState({
            internalId: undefined,
            elementConfigurations: {},
            selectionType: undefined
        });
        StateActions.closeModal();
    };

    render() {
        return (
            <button className={"btn " + this.props.btnClass} onClick={this.openModal}>
                <i className={this.props.icon}></i>{this.props.label}
            </button>
        );
    }

    static propTypes = {
        /**
         * Element id given by the protocol (auto-increment)
         * */
        elementID: PropTypes.number,
        /**
         * Function to perform in the parent (edit or add new element to the protocol)
         *
         * @param element
         * */
        onClick: PropTypes.func,
        /**
         * Function to get the element data received when in edition mode
         * */
        getElementData: PropTypes.func,
        /**
         * Button icon
         * */
        icon: PropTypes.string,
        /**
         * Element id given by the protocol (auto-increment)
         * */
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ])
    };
}

AddProtocolElement.defaultProps = {
    elementID: 1,
    icon: "fa fa-plus",
    label: <span>&nbsp;Add element</span>
};

export default AddProtocolElement;
