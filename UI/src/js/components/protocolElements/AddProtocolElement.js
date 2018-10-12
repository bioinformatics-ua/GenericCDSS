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
                {value: 'Inquiry', label: 'Inquiry'},
                {value: 'Decision', label: 'Decision'},
                {value: 'Action', label: 'Action'}
            ],
            validated: false
        };

        this.child = null;
        this.setChildRef = element => {
            this.child = element;
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
        if(prevProps.elementID !== this.props.elementID)
            this.setState({internalId: this.props.elementID.toString()});

        if (prevState !== this.state)
            StateActions.updateModal(this.modalHeader(), this.modalContent(), this.modalFooter());
    }

    /*******************************************************************************************************************
     * Auxiliary functions
     ******************************************************************************************************************/
    isElementValid = () => {
        this.setState({validated: true});
        return (this.state.internalId !== "" && this.state.selectionType !== undefined && this.child.isValid());
    };

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
                case 'Inquiry':
                    return (
                        <InquiryElement ref={this.setChildRef}
                                        addElementConfigurations={this.addElementConfigurations}
                                        elementData={this.state.elementData}
                                        mode={this.state.mode}/>
                    );
                case 'Decision':
                    return (
                        <DecisionElement ref={this.setChildRef}
                                         addElementConfigurations={this.addElementConfigurations}
                                         elementData={this.state.elementData}
                                         mode={this.state.mode}/>
                    );
                case 'Action':
                    return (
                        <ActionElement ref={this.setChildRef}
                                       addElementConfigurations={this.addElementConfigurations}
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
        if(this.isElementValid()){
            let element = this.buildElementObject();
            this.closeModal();
            this.props.onClick(element);
        }
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
                              className={"mb-3"}
                              readOnly={this.state.mode === 'edit'}
                              isInvalid={this.state.internalId === "" && this.state.validated}
                              invalidMessage={"The element id must be defined"}/>
                <DisplayOptionsField label={"Element type"}
                                     options={this.state.typeOptions}
                                     onChange={this.typeSelectHandleChange}
                                     selection={this.state.selectionType}
                                     className={"mb-3"}
                                     selectClassName={"Selectx3"}
                                     isInvalid={this.state.selectionType === undefined && this.state.validated}
                                     invalidMessage={"An element type must be selected"}/>
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
            selectionType: undefined,
            validated: false
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
