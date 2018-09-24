import React from 'react';
import Reflux from 'reflux';
import {ProtocolStore, ProtocolActions} from '../../reflux/ProtocolReflux.js';
import {ScheduleStore, ScheduleActions} from '../../reflux/ScheduleReflux.js';
import {StateActions} from '../../reflux/StateReflux.js';
import AddProtocolElement from '../protocolElements/AddProtocolElement.js';
import Settings from '../../GlobalSettings.js';
import $ from 'jquery';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import DisplayField from '../reusable/DisplayField.js';
import DisplayOptionsField from '../reusable/DisplayOptionsField.js';

class ShowProtocol extends Reflux.Component {
    constructor(props) {
        super(props);
        this.stores = [ProtocolStore, ScheduleStore];
        this.state = {
            protocolID: this.props.match.params.object,
            mode: this.getMode(),
            biggestElementId: 1,
            schedules: undefined,
            validated: false,
            insertionData: {},
            resultActions: []
        };
    }

    componentDidMount() {
        ProtocolActions.loadProtocol(this.state.protocolID);
        ScheduleActions.load();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.protocolInquiryData !== this.state.protocolInquiryData) {
            let inquiryElements = [];
            for (let cvIndex in this.state.protocolInquiryData.Elements) {
                let cv = this.state.protocolInquiryData.Elements[cvIndex]["clinicalVariable"]["variable"];
                inquiryElements.push(<DisplayField onChange={this.cvHandleChange}
                                                   label={cv}
                                                   keydata={cv}
                                                   value={this.state.insertionData[cv]}
                                                   key={cvIndex}
                                                   className={"mb-3"}/>);
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
                    <p key={actionIndex}>{this.state.actions[actionIndex][0] + " - " + this.state.actions[actionIndex][1]}</p>);

            this.setState({resultActions: resultActions, protocolExecuted: true});
        }

        if (prevState.resultActions !== this.state.resultActions)
            StateActions.updateModal(this.modalHeader(), this.modalContent(), this.modalFooter());

        if (prevState.protocolTitle !== this.state.protocolTitle && this.state.protocolTitle !== "")
            StateActions.openModal(this.modalHeader(), this.modalContent(), this.modalFooter());
    }


    /*******************************************************************************************************************
     * Modal actions
     ******************************************************************************************************************/
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

    modalFooter = () => {
        return (<div className="btn-group">
            <button className="btn btn-default btn-100" onClick={this.closeModal}>
                <i className="fa fa-ban"></i>&nbsp;Cancel
            </button>
            <button className="btn btn-success btn-100" onClick={this.runProtocol}>
                <i className="fa fa-play"></i>&nbsp;Run
            </button>
        </div>);
    };

    runProtocol = () => {
        //to do
        //It is necessary verify if all the data was inserted
        // but for now i only will call the service and go
        //console.log(this.state);
        let insertionData = this.state.insertionData;
        let protocolId = this.state.protocolInquiryData.Protocol.id;

        ProtocolActions.runProtocolTest(protocolId, insertionData);
    };

    closeModal = () => {
        StateActions.closeModal();
    };


    /*******************************************************************************************************************
     * Auxiliary functions
     ******************************************************************************************************************/
    getMode = () => {
        return this.props.match.path.split("/")[1];
    };

    cvHandleChange = (event) => {
        event.preventDefault();
        let key = $(event.target).data("keydata");
        let new_insertionData = this.state.insertionData;
        new_insertionData[key] = event.target.value;
        this.setState({insertionData: new_insertionData});
    };

    protocolIsValid = () => {
        this.setState({validated: true});
        return (this.state.protocol.title !== "" && this.state.protocol.description !== "" && this.state.schedules !== undefined);
    };

    getSchedules = () => {
        /**
         * Get the labels from the schedules selected and returns an array
         *
         * @return array of schedules (strings)
         * */
        let protocolSchedules = [];
        for (let scheduleIndex in this.state.schedules)
            protocolSchedules.push(this.state.schedules[scheduleIndex].label);
        return protocolSchedules;
    };

    handleChange = (event) => {
        event.preventDefault();
        let key = $(event.target).data("keydata");
        let protocol = this.state.protocol;
        protocol[key] = event.target.value;
        this.setState({protocol: protocol});
    };

    addElement = (element) => {
        let protocolData = this.state.protocolData;
        protocolData.push(element);
        this.setState({
            protocolData: protocolData,
            biggestElementId: parseInt(protocolData["internalId"], 10) + 1
        });
    };

    schedulesSelectHandleChange = (selection) => {
        this.setState({schedules: selection});
    };

    /*******************************************************************************************************************
     * Button actions
     ******************************************************************************************************************/
    editProtocol = () => {
        console.log("editProtocol");
    };

    runProtocolExample = () => {
        let protocolId = this.state.protocolID;
        ProtocolActions.loadProtocolInquiryActions(protocolId);
    };

    removeProtocol = () => {
        console.log("removeProtocol");
        /**
         * Shows a modal asking if the user is sure about it, if yes call a web service and destivate protocol only todo
         * */
    };

    saveProtocol = () => {
        if (this.protocolIsValid()) {
            let protocolSchedules = this.getSchedules();
            ProtocolActions.createProtocol(protocolSchedules);
            //redirect
        }
    };

    render() {
        const columns = [{
            Header: () => <h5 className="h5-table">ID</h5>,
            id: "id",
            accessor: obj => obj.internalId,
            Cell: props => <span>{props.value}</span>
        }, {
            Header: () => <h5 className="h5-table">Type</h5>,
            id: "type",
            accessor: obj => obj.type,
            Cell: props => <span>{props.value}</span>
        }, {
            Header: () => <h5 className="h5-table">Next element</h5>,
            id: "next",
            accessor: obj => obj.nextElement,
            Cell: props => <span>{props.value}</span>
        }, {
            Header: () => <h5 className="h5-table">Clinical Variable</h5>,
            id: "cv",
            accessor: obj => obj.clinicalVariable,
            Cell: props => <span>{props.value !== undefined ? props.value.variable : ""}</span>
        }, {
            Header: () => <h5 className="h5-table">Condition</h5>,
            id: "cond",
            accessor: obj => obj.condition,
            Cell: props => <span>{props.value}</span>
        }, {
            Header: () => <h5 className="h5-table">Action</h5>,
            id: "action",
            accessor: obj => obj.action,
            Cell: props => <span>{props.value}</span>
        }];

        let extraObjectsSize = this.state.mode === "show" ? 200 : 245;

        return (
            <div className="ShowProtocol">
                <h2>Protocol</h2>
                <div className="card card-body PatientInfo mb-3">
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <DisplayField label={"Title"}
                                          keydata={"title"}
                                          onChange={this.handleChange}
                                          value={this.state.protocol.title}
                                          readOnly={this.state.mode === "show"}
                                          isInvalid={this.state.protocol.title === "" && this.state.validated}
                                          invalidMessage={"The title field is empty"}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <DisplayField label={"Description"}
                                          keydata={"description"}
                                          onChange={this.handleChange}
                                          value={this.state.protocol.description}
                                          readOnly={this.state.mode === "show"}
                                          isInvalid={this.state.protocol.description === "" && this.state.validated}
                                          invalidMessage={"The description field is empty"}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className={this.state.mode === "show" ? "col-md-7" : "col-md-12"}>
                            <DisplayOptionsField label={"Schedules"}
                                                 options={this.state.schedulesOptions}
                                                 onChange={this.schedulesSelectHandleChange}
                                                 readOnly={this.state.mode === "show"}
                                                 selection={this.state.schedules}
                                                 multi={true}
                                                 isInvalid={this.state.schedules === undefined && this.state.validated}
                                                 invalidMessage={"There is no selected schedules"}/>
                        </div>
                        {this.state.mode === "show" ?
                            <div className="col-md-5 align-self-center">
                                <div className="btn-group pull-right">
                                    {/*<button className="btn btn-sm btn-info btn-100" onClick={this.handleChange}><strong><i className="fa fa-code-fork"></i>&nbsp;Fork</strong></button>*/}
                                    <button className="btn btn-sm btn-primary btn-150"
                                            onClick={this.runProtocolExample}>
                                        <strong><i className="fa fa-play"></i>&nbsp;Run example</strong>
                                    </button>
                                    <button className="btn btn-sm btn-warning btn-150" onClick={this.editProtocol}>
                                        <strong><i className="fa fa-pencil"></i>&nbsp;Edit</strong>
                                    </button>
                                    <button className="btn btn-sm btn-danger btn-150" onClick={this.removeProtocol}>
                                        <strong><i className="fa fa-times"></i>&nbsp;Remove</strong>
                                    </button>
                                </div>
                            </div> : ''}
                    </div>
                </div>

                <div className="card ">
                    <div className="card-content">
                        <ReactTable
                            data={this.state.protocolData}
                            columns={columns}
                            defaultPageSize={Settings.getPatientTableRows(extraObjectsSize)}
                            filterable
                            pageSizeOptions={[Settings.getPatientTableRows(extraObjectsSize), 50, 100]}
                            defaultSorted={[{
                                id: 'id',
                                asc: true,
                            }]}/>
                    </div>
                </div>
                {
                    this.state.mode !== "show" ?
                        <div className="btn-group CRUDProtocol-buttons-controler pull-right mb-3">
                            <AddProtocolElement btnClass={"btn-150"}
                                                addElement={this.addElement}
                                                elementID={this.state.biggestElementId}/>
                            <button className="btn btn-primary btn-150" onClick={this.saveProtocol}>
                                <i className="fa fa-calendar-alt"></i>&nbsp;Save
                            </button>
                        </div> : ''
                }
            </div>
        );
    }
}

export default ShowProtocol;
