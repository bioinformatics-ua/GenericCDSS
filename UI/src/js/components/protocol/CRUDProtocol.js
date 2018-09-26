import React from 'react';
import Reflux from 'reflux';
import {ProtocolStore, ProtocolActions} from '../../reflux/ProtocolReflux.js';
import {ScheduleStore, ScheduleActions} from '../../reflux/ScheduleReflux.js';
import AddProtocolElement from '../protocolElements/AddProtocolElement.js';
import RunProtocolButton from '../buttons/RunProtocolButton.js';
import ButtonWithMsg from '../reusable/ButtonWithMsg.js';
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
            validated: false
        };
    }

    componentDidMount() {
        ProtocolActions.loadProtocol(this.state.protocolID);
        ScheduleActions.load();
    }

    /*******************************************************************************************************************
     * Auxiliary functions
     ******************************************************************************************************************/
    getMode = () => {
        return this.props.match.path.split("/")[1];
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

    removeProtocol = () => {
        ProtocolActions.removeProtocol(this.state.protocolID);
    };

    saveProtocol = () => {
        if (this.protocolIsValid()) {
            let protocolSchedules = this.getSchedules();
            ProtocolActions.createProtocol(protocolSchedules);
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

        let extraObjectsSize = this.state.mode === "show" ? 245 : 245;

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
                        <div className="col-md-12 mb-3">
                            <DisplayOptionsField label={"Schedules"}
                                                 options={this.state.schedulesOptions}
                                                 onChange={this.schedulesSelectHandleChange}
                                                 readOnly={this.state.mode === "show"}
                                                 value={this.state.protocol.schedules}
                                                 selection={this.state.schedules}
                                                 multi={true}
                                                 isInvalid={this.state.schedules === undefined && this.state.validated}
                                                 invalidMessage={"There is no selected schedules"}/>
                        </div>
                    </div>
                    <div className="row">
                        {this.state.mode === "show" ?
                            <div className="col-md-12 align-self-center">
                                <div className="btn-group pull-right">
                                    {/*<button className="btn btn-sm btn-info btn-100" onClick={this.handleChange}><strong><i className="fa fa-code-fork"></i>&nbsp;Fork</strong></button>*/}

                                    <RunProtocolButton className={"btn btn-sm btn-primary btn-150"}
                                                 label={<strong>Run example</strong>}
                                                 protocolID={this.state.protocolID}
                                                 testMode={true}/>
                                    <button className="btn btn-sm btn-warning btn-150" onClick={this.editProtocol}>
                                        <strong><i className="fa fa-pencil"></i>&nbsp;Edit</strong>
                                    </button>
                                    <ButtonWithMsg icon={"fa fa-times"}
                                                   label={"Remove"}
                                                   message={"You protocol has been removed."}
                                                   messageTitle={"Deleted!"}
                                                   className={"btn btn-sm btn-danger btn-150"}
                                                   action={this.removeProtocol}
                                                   redirect={"/protocols"}
                                                   confirmationMsg={"You will not be able to recover this protocol!"}/>
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
                            <AddProtocolElement btnClass={"btn-sm btn-150"}
                                                addElement={this.addElement}
                                                elementID={this.state.biggestElementId}/>
                            <button className="btn btn-sm btn-primary btn-150" onClick={this.saveProtocol}>
                                <i className="fa fa-calendar-alt"></i>&nbsp;Save
                            </button>
                        </div> : ''
                }
            </div>
        );
    }
}

export default ShowProtocol;
