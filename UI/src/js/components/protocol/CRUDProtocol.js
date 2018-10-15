import React from 'react';
import Reflux from 'reflux';
import {ProtocolStore, ProtocolActions} from '../../reflux/ProtocolReflux.js';
import {ScheduleStore, ScheduleActions} from '../../reflux/ScheduleReflux.js';
import {ClinicalVariablesStore, ClinicalVariablesActions} from '../../reflux/ClinicalVariablesReflux.js';
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
        this.stores = [ProtocolStore, ScheduleStore, ClinicalVariablesStore];
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
        ClinicalVariablesActions.loadCVHeaders();
        ScheduleActions.load();
    }

    /*******************************************************************************************************************
     * Auxiliary functions
     ******************************************************************************************************************/
    getMode = () => {
        return this.props.match.path.split("/")[1];
    };

    validateProtocolElements = () => {
        let ids = [];
        for (let elementIndex in this.state.protocolData)
            ids.push(parseInt(this.state.protocolData[elementIndex]["internalId"], 10));


        //If all the for runs until the end, means that all the nextElementIds are correct
        for (let elementIndex in this.state.protocolData)
            if(!this.nextElementExistsInIdsList(ids, this.state.protocolData[elementIndex]))
                return false;

        return true;
    };

    nextElementExistsInIdsList = (idsList, element) => {
        switch(element["type"]){
            case "Decision" :
                let options = element["nextElement"].split(";");
                switch(options.length){ //Maybe this switch need to be changed
                    case 0:
                        return true;
                    case 1://Maybe this never is used the case 0 and 1, check later
                        let idToCheck = options[0].split(":")[1];
                        for(let id in idsList)
                            if(parseInt(idToCheck, 10) === idsList[id])
                                return true;
                        return false;
                    case 2:
                        let idToCheckFalse = options[0].split(":")[1];
                        let idToCheckTrue = options[1].split(":")[1];
                        let checkedFalse = false;
                        let checkedTrue = false;
                        for(let id in idsList){
                            if(idToCheckFalse.length > 0){
                                if(parseInt(idToCheckFalse, 10) === idsList[id])
                                    checkedFalse = true;
                            }
                            else
                                checkedFalse = true;

                            if(idToCheckTrue.length > 0){
                                if(parseInt(idToCheckTrue, 10) === idsList[id])
                                    checkedTrue = true;
                            }
                            else
                                checkedTrue = true;
                        }
                        return checkedFalse && checkedTrue;
                }
                return false;
            case "Inquiry" :
            case "Action" :
                if(element["nextElement"] === undefined || element["nextElement"] === "")
                    return true;
                for(let id in idsList)
                    if(parseInt(element["nextElement"], 10) === idsList[id])
                        return true;
                return false;
        }
    };

    protocolIsValid = () => {
        this.setState({validated: true});
        return (this.state.protocol.title !== "" &&
                this.state.protocol.description !== "" &&
                this.state.schedules !== undefined &&
                this.validateProtocolElements());
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
            biggestElementId: parseInt(element["internalId"], 10) + 1
        });
    };

    schedulesSelectHandleChange = (selection) => {
        this.setState({schedules: selection});
    };

    getElementData = (elementId) => {
        for (let elementIndex in this.state.protocolData){
            let element = this.state.protocolData[elementIndex];
            if(parseInt(element["internalId"], 10) === parseInt(elementId, 10))
                return element;
        }
    };

    /*******************************************************************************************************************
     * Button actions
     ******************************************************************************************************************/
    editElement = (editedElement) => {
        let protocolData = [];
        let maxInternalId = 0;
        for (let elementIndex in this.state.protocolData){
            let element = this.state.protocolData[elementIndex];
            if(parseInt(element["internalId"], 10) === parseInt(editedElement["internalId"], 10))
                continue;
            protocolData.push(element);
            if(parseInt(element["internalId"], 10) > maxInternalId)
                maxInternalId = parseInt(element["internalId"], 10);
        }
        protocolData.push(editedElement);
        this.setState({
            protocolData: protocolData,
            biggestElementId: maxInternalId + 1
        });
    };

    removeElement = (event) => {
        event.preventDefault();
        let elementId = $(event.target).data("elementid");
        let protocolData = [];
        let maxInternalId = 0;
        for (let elementIndex in this.state.protocolData){
            let element = this.state.protocolData[elementIndex];
            if(parseInt(element["internalId"], 10) === elementId)
                continue;
            protocolData.push(element);
            if(parseInt(element["internalId"], 10) > maxInternalId)
                maxInternalId = parseInt(element["internalId"], 10);
        }
        this.setState({
            protocolData: protocolData,
            biggestElementId: maxInternalId + 1
        });
    };

    editProtocol = () => {
        this.setState({mode:"edit"});
    };

    removeProtocol = () => {
        ProtocolActions.removeProtocol(this.state.protocolID);
    };

    saveProtocol = () => {
        if (this.protocolIsValid()) {
            let protocolSchedules = this.getSchedules();
            if(this.state.mode === "edit")
                ProtocolActions.editProtocol(protocolSchedules, this.state.protocolData);
            else
                ProtocolActions.createProtocol(protocolSchedules);
            return undefined;
        }
        return false;
    };

    render() {
        const columns = [];
        if(this.state.mode !== "show")
            columns.push({
                Header: () => <h5 className="h5-table"></h5>,
                id: "selection",
                maxWidth: 33,
                filterable: false,
                accessor: obj => obj.internalId,
                Cell: props => <AddProtocolElement btnClass={"btn-xxs btn-sm btn-inverse-warning"}
                                                   onClick={this.editElement}
                                                   icon={"fa fa-pencil"}
                                                   label={""}
                                                   elementID={parseInt(props.value, 10)}
                                                   getElementData={this.getElementData}/>
            });
        columns.push({
            Header: () => <h5 className="h5-table">ID</h5>,
            id: "id",
            accessor: obj => obj.internalId,
            Cell: props => <span>{props.value}</span>
        });
        columns.push({
            Header: () => <h5 className="h5-table">Type</h5>,
            id: "type",
            accessor: obj => obj.type,
            Cell: props => <span>{props.value}</span>
        });
        columns.push({
            Header: () => <h5 className="h5-table">Next element</h5>,
            id: "next",
            accessor: obj => obj.nextElement,
            Cell: props => <span>{props.value}</span>
        });
        columns.push({
            Header: () => <h5 className="h5-table">Clinical Variable</h5>,
            id: "cv",
            accessor: obj => obj.clinicalVariable,
            Cell: props => <span>{props.value !== undefined ? props.value.variable : ""}</span>
        });
        columns.push({
            Header: () => <h5 className="h5-table">Condition</h5>,
            id: "cond",
            accessor: obj => obj.condition,
            Cell: props => <span>{props.value}</span>
        });
        columns.push({
            Header: () => <h5 className="h5-table">Action</h5>,
            id: "action",
            accessor: obj => obj.action,
            Cell: props => <span>{props.value}</span>
        });

        if(this.state.mode !== "show")
            columns.push({
                Header: () => <h5 className="h5-table"></h5>,
                id: "remove",
                maxWidth: 33,
                filterable: false,
                accessor: obj => obj.internalId,
                Cell: props => <span>
                    <button data-elementid={props.value}  className="btn btn-xxs btn-sm btn-inverse-danger" onClick={this.removeElement}>
                        <i data-elementid={props.value}  className="fa fa-times"></i>
                    </button>
                </span>
            });

        let extraObjectsSize = this.state.mode === "show" ? 245 : 245;

        return (
            <div className="ShowProtocol">
                <h2><i className="fa fa-sitemap"></i>&nbsp;Protocol</h2>
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
                                                   label={<strong>Remove</strong>}
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
                            <AddProtocolElement btnClass={"btn-success btn-sm btn-150"}
                                                onClick={this.addElement}
                                                elementID={this.state.biggestElementId}/>
                            <ButtonWithMsg icon={"fa fa-calendar-alt"}
                                           label={"Save"}
                                           errorMessage={"Some of the protocol elements are incorrect!"}
                                           errorMessageTitle={"Something is wrong!"}
                                           className={"btn btn-sm btn-primary btn-150"}
                                           action={this.saveProtocol} />
                        </div> : ''
                }
            </div>
        );
    }
}

export default ShowProtocol;
