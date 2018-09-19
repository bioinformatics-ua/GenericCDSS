import React from 'react';
import Reflux from 'reflux';
import {StateActions} from '../../reflux/StateReflux.js';
import {ProtocolStore, ProtocolActions} from '../../reflux/ProtocolReflux.js';
import DisplayField from '../reusable/DisplayField.js';
import $ from 'jquery';

class RunSimpleProtocol extends Reflux.Component {
    constructor(props) {
        super(props);
        this.stores = [ProtocolStore];
        this.state = {
            protocolExecuted: false,
            inquiryElements: [],
            protocolTitle: "",
            insertionData: {},
            resultActions: []
        };
    }

    handleChange = (event) => {
        event.preventDefault();
        let key = $(event.target).data("keydata");
        let new_insertionData = this.state.insertionData;
        new_insertionData[key] = event.target.value;
        this.setState({insertionData: new_insertionData});
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.protocolInquiryData !== this.state.protocolInquiryData) {
            let inquiryElements = [];
            for (let cvIndex in this.state.protocolInquiryData.Elements) {
                let cv = this.state.protocolInquiryData.Elements[cvIndex]["clinicalVariable"]["variable"];
                inquiryElements.push(<div className="mb-3">
                                        <DisplayField onChange={this.handleChange}
                                                      label={cv}
                                                      keydata={cv}
                                                      value={this.state.insertionData[cv]}
                                                      key={cvIndex}/>
                                     </div>);
            }

            this.setState({
                inquiryElements: inquiryElements,
                protocolTitle: this.state.protocolInquiryData.Protocol.title
            });
        }

        if (prevState.actions !== this.state.actions) {
            let resultActions = [];
            for (let actionIndex in this.state.actions)
                resultActions.push(
                    <p>{this.state.actions[actionIndex][0] + " - " + this.state.actions[actionIndex][1]}</p>);

            this.setState({resultActions: resultActions, protocolExecuted: true});
        }

        if (prevState.resultActions !== this.state.resultActions)
            StateActions.updateModal(this.modalHeader(), this.modalContent(), this.modalFooter());

        if (prevState.protocolTitle !== this.state.protocolTitle && this.state.protocolTitle !== "")
            StateActions.openModal(this.modalHeader(), this.modalContent(), this.modalFooter());
    }

    modalHeader = () => {
        return (
            <div className="">
                <h1>{this.state.protocolTitle}</h1>
            </div>
        );
    };

    modalContent = () => {
        /**
         * ask for the cvs
         * */
        return (
            <div className="card-body">
                {this.state.inquiryElements}
                {this.state.resultActions.length !== 0 ?
                    <div className="card panel-info">
                        <div className="card-header">Actions recommended</div>
                        <div className="card-body">{this.state.resultActions}</div>
                    </div> : ''}
            </div>
        );
    };

    runProtocol = () => {
        //to do
        //It is necessary verify if all the data was inserted
        // but for now i only will call the service and go
        //console.log(this.state);
        let insertionData = this.state.insertionData;
        let protocolId = this.state.protocolInquiryData.Protocol.id;
        let patientId = this.state.patientID;

        ProtocolActions.runProtocol(patientId, protocolId, insertionData);
    };


    modalFooter = () => {
        /*
         .* Verify if run is pressed or not and show run or only cancel
         * */
        if (!this.state.protocolExecuted)
            return (<div className="btn-group">
                <button className="btn btn-default btn-100" onClick={this.closeModal}>
                    <i className="fa fa-ban"></i>&nbsp;Cancel
                </button>
                <button className="btn btn-success btn-100" onClick={this.runProtocol}>
                    <i className="fa fa-play"></i>&nbsp;Run
                </button>
            </div>);
        else
            return (<div className="">
                <button className="btn btn-default btn-100" onClick={this.closeModal}>
                    <i className="fa fa-ban"></i>&nbsp;Cancel
                </button>
            </div>);
    };

    openModal = (event) => {
        event.preventDefault();
        /**
         * Load the inquiry actions from protocol
         **/
        let patientId = $(event.target).data("patientid");
        ProtocolActions.loadInquiryActions(patientId);
    };

    closeModal = () => {
        StateActions.closeModal();
    };

    render() {
        return (
            <button data-patientid={this.props.patientID} className="btn btn-xxs btn-sm btn-primary"
                    onClick={this.openModal}>
                <i data-patientid={this.props.patientID} className="fa fa-play"></i>&nbsp;Run protocol
            </button>
        );
    }
}
export default RunSimpleProtocol;