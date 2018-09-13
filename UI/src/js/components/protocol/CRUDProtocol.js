import React from 'react';
import Reflux from 'reflux';
import {ProtocolStore, ProtocolActions} from '../../reflux/ProtocolReflux.js';
import AddProtocolElement from '../protocolElements/AddProtocolElement.js';
import Settings from '../../GlobalSettings.js';

import ReactTable from 'react-table'
import "react-table/react-table.css";
//import {Link} from "react-router-dom";
//import {AdmissionStore, AdmissionActions} from '../../reflux/AdmissionReflux.js';
//import Settings from '../../GlobalSettings.js';

import DisplayField from '../reusable/DisplayField.js';

class ShowProtocol extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ProtocolStore;
        this.state = {
            protocolID: this.props.match.params.object,
            mode: this.getMode()
        };
    }

    getMode = () => {
        return this.props.match.path.split("/")[1];
    };

    componentDidMount() {
        ProtocolActions.loadProtocol(this.state.protocolID);
    }

    editProtocol = () => {
        console.log("editProtocol");
    };

    removeProtocol = () => {
        console.log("removeProtocol");
        /**
         * Shows a modal asking if the user is sure about it, if yes call a web service and destivate protocol only todo
         * */
    };

    saveProtocol = () => {
        console.log("saveProtocol");
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

        let extraObjectsSize = 160;

        //duplicar, editar, eliminar e tornar publico
        return (
            <div className="ShowProtocol">
                <h2>Protocol</h2>
                <div className="panel panel-default panel-body PatientInfo">
                    <div className="row">
                        <div className="col-md-12">
                            <DisplayField readOnly={true} onChange={this.handleChange} label={"Title"}
                                          keydata={"title"} value={this.state.protocol.title}/>
                        </div>

                    </div>
                    {this.state.mode === "show" ?
                        <div className="row">
                            {/*This 2 displays are not doing nothing for now*/}
                            <div className="col-md-4">
                                <DisplayField readOnly={true} onChange={this.handleChange} label={"Type"}
                                              keydata={"last_name"} value={"Simple"}/>
                            </div>
                            <div className="col-md-4">
                                <DisplayField readOnly={true} onChange={this.handleChange} label={"Permissions"}
                                              keydata={"first_name"} value={"Public"}/>
                            </div>
                            <div className="col-md-4">
                                <div className="btn-group pull-right">
                                    {/*<button className="btn btn-sm btn-info btn-100" onClick={this.handleChange}><strong><i className="fa fa-code-fork"></i>&nbsp;Fork</strong></button>*/}
                                    <button className="btn btn-sm btn-warning btn-150" onClick={this.editProtocol}>
                                        <strong><i className="fa fa-pencil"></i>&nbsp;Edit</strong></button>
                                    <button className="btn btn-sm btn-danger btn-150" onClick={this.removeProtocol}>
                                        <strong><i
                                            className="fa fa-times"></i>&nbsp;Remove</strong></button>
                                </div>
                            </div>
                        </div> : ''}
                </div>

                <div className="panel panel-default">
                    <div className="panel-content">
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

                        {this.state.mode !== "show" ?
                            <div className="btn-group CRUDProtocol-buttons-controler pull-right">
                                <AddProtocolElement btnClass={"btn-150"}/>
                                <button className="btn btn-primary btn-150" onClick={this.saveProtocol}>
                                    <i className="fa fa-save"></i>&nbsp;Save
                                </button>
                            </div> : ''}
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowProtocol;
