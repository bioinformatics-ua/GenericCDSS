import React from 'react';
import Reflux from 'reflux';
import {StateActions} from '../../reflux/StateReflux.js';
import {ProtocolStore, ProtocolActions} from '../../reflux/ProtocolReflux.js';
import DisplayField from '../reusable/DisplayField.js';
import DisplayOptionsField from '../reusable/DisplayOptionsField.js';
import $ from 'jquery';
import PropTypes from 'prop-types';

/**
 * Component to run protocols
 * */
class RunProtocolButton extends Reflux.Component {
    constructor(props) {
        super(props);
        this.stores = [ProtocolStore];
        this.state = {
            protocolExecuted: false,
            inquiryElements: [],
            protocolTitle: "",
            insertionData: {},
            resultActions: [],
            nextMeasurement: undefined
        };
    }

    /*******************************************************************************************************************
     * State control functions
     ******************************************************************************************************************/
    componentDidUpdate(prevProps, prevState) {
        this.updateModalContentWithDisplayFields(prevState);
        this.updateModalContentWithActionResults(prevState);
        this.checkIfModalCanBeOpen(prevState);
    }

    updateModalContentWithDisplayFields = (prevState) => {
        if (prevState.protocolInquiryData !== this.state.protocolInquiryData) {
            let inquiryElements = [];
            let count = 1;
            for (let cvIndex in this.state.protocolInquiryData.Elements) {
                let clinicalVariable = this.state.protocolInquiryData.Elements[cvIndex]["clinicalVariable"];
                let cv = clinicalVariable["variable"];
                if(clinicalVariable["type"] === "Conditional"){
                    count+=1;
                    let options = clinicalVariable["options"].map(entry => {
                        return {
                            value: entry,
                            label: entry
                        }
                    });
                    inquiryElements.push(<DisplayOptionsField onChange={this.selectHandleChange}
                                                              label={cv}
                                                              options={options}
                                                              keydata={cv}
                                                              value={this.state.insertionData[cv]}
                                                              selection={this.state.insertionData[cv]}
                                                              key={cvIndex}
                                                              className={"Selectx" + count + " mb-3"}
                                                              readOnly={this.protocolWasExecuted}/>);
                }
                else{
                    let type = clinicalVariable["type"] === "Numeric" ? "number": "text";
                    inquiryElements.push(<DisplayField onChange={this.handleChange}
                                                       label={cv}
                                                       keydata={cv}
                                                       value={this.state.insertionData[cv]}
                                                       key={cvIndex}
                                                       className={"mb-3"}
                                                       type={type}
                                                       readOnly={this.protocolWasExecuted}/>);
                }
            }

            this.setState({
                inquiryElements: inquiryElements,
                protocolTitle: this.state.protocolInquiryData.Protocol.title
            });
        }
    };

    updateModalContentWithActionResults = (prevState) => {
        if (prevState.actions !== this.state.actions) {
            let resultActions = [];
            for (let actionIndex in this.state.actions)
                resultActions.push(
                    <p key={actionIndex+100}>{this.state.actions[actionIndex][0] + " - " + this.state.actions[actionIndex][1]}</p>);

            this.setState({resultActions: resultActions, protocolExecuted: !this.props.testMode});
        }

        if (prevState.resultActions !== this.state.resultActions)
            StateActions.updateModal(this.modalHeader(), this.modalContent(), this.modalFooter());
    };

    checkIfModalCanBeOpen = (prevState) => {
        if (prevState.protocolTitle !== this.state.protocolTitle && this.state.protocolTitle !== "")
            StateActions.openModal(this.modalHeader(), this.modalContent(), this.modalFooter());
    };

    /*******************************************************************************************************************
     * Auxiliary functions
     ******************************************************************************************************************/
    handleChange = (event) => {
        event.preventDefault();
        let key = $(event.target).data("keydata");
        let new_insertionData = this.state.insertionData;
        new_insertionData[key] = event.target.value;
        this.setState({insertionData: new_insertionData});
    };

    selectHandleChange = (selection, key) => {
        let new_insertionData = this.state.insertionData;
        new_insertionData[key] = selection.value;
        this.setState({insertionData: new_insertionData});
    };

    runProtocol = () => {
        //todo
        //It is necessary verify if all the data was inserted
        // but for now i only will call the service and go
        let insertionData = this.state.insertionData;
        let protocolId = this.state.protocolInquiryData.Protocol.id;
        let patientId = this.state.patientID;

        if (this.props.testMode)
            ProtocolActions.runProtocolTest(protocolId, insertionData);
        else
            ProtocolActions.runProtocol(patientId, protocolId, insertionData);
    };

    protocolWasExecuted = () => {
        return this.state.protocolExecuted;
    };

    /*******************************************************************************************************************
     * Modal configuration functions
     ******************************************************************************************************************/
    modalHeader = () => {
        return (
            <div className="">
                <h1><i className="fa fa-sitemap"></i>&nbsp;{this.state.protocolTitle}</h1>
            </div>
        );
    };

    modalContent = () => {
        return this.retrieveInquiryElementsAndActionsRecomended();
    };

    retrieveInquiryElementsAndActionsRecomended = () => {
        //todo nextMeasurement box
        return (
            <div className="card-body">
                {this.state.inquiryElements}
                {this.state.resultActions.length !== 0 ?
                    <div className="card panel-info mb-3">
                        <div className="card-header">Actions recommended</div>
                        <div className="card-body">{this.state.resultActions}</div>
                    </div> : ''}
                {this.state.nextMeasurement !== undefined ?
                    <div className="card panel-info">
                        <div className="card-header">Next measurement</div>
                        <div className="card-body">{this.state.nextMeasurement}</div>
                    </div> : ''}
            </div>
        );
    };

    modalFooter = () => {
        /*
         * Verify if run is pressed or not and show run or only cancel
         * */
        if (!this.state.protocolExecuted)
            return (<div className="btn-group">
                <button className="btn btn-sm btn-default btn-100" onClick={this.closeModal}>
                    <i className="fa fa-ban"></i>&nbsp;Cancel
                </button>
                <button className="btn btn-sm btn-success btn-100" onClick={this.runProtocol}>
                    <i className="fa fa-play"></i>&nbsp;Run
                </button>
            </div>);
        else
            return (<div className="">
                <button className="btn btn-sm btn-default btn-100" onClick={this.closeModal}>
                    <i className="fa fa-ban"></i>&nbsp;Cancel
                </button>
            </div>);
    };

    openModal = (event) => {
        /**
         * Load the inquiry actions from protocol
         **/
        if (this.props.patientID !== undefined) {
            let patientId = this.props.patientID;
            ProtocolActions.loadInquiryActions(patientId);
        }

        if (this.props.protocolID !== undefined) {
            let protocolId = this.props.protocolID;
            ProtocolActions.loadProtocolInquiryActions(protocolId);
        }
    };

    closeModal = () => {
        this.setState({
            protocolExecuted: false,
            inquiryElements: [],
            protocolTitle: "",
            insertionData: {},
            resultActions: []
        });

        if(this.props.refreshParent !== undefined)
            this.props.refreshParent();

        StateActions.closeModal();
    };

    render() {
        return (
            <button data-patientid={this.props.patientID} className={this.props.className} onClick={this.openModal}>
                <span><i data-patientid={this.props.patientID} className={this.props.icon}></i>&nbsp;{this.props.label}</span>
            </button>
        );
    }

    static propTypes = {
        /**
         * Button class name
         * */
        className: PropTypes.string,
        /**
         * Button icon class name
         * */
        icon: PropTypes.string,
        /**
         * Button label
         * */
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        /**
         * Protocol id, somethimes it is necessary
         * */
        protocolID: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        /**
         * Patient id, somethimes it is necessary
         * */
        patientID: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        /**
         * Function to execute after the protocol execution, defined in the parent component
         * */
        refreshParent: PropTypes.func
    }
}

RunProtocolButton.defaultProps = {
    className: "btn btn-xxs btn-sm btn-primary",
    icon: "fa fa-play",
    label: "Run protocol",
    protocolID: undefined,
    patientID: undefined,
    testMode: false,
    refreshParent: undefined
};

export default RunProtocolButton;