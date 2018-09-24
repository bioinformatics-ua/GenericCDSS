import React from 'react';
import Reflux from 'reflux';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import {Link} from "react-router-dom";
import {AdmissionStore, AdmissionActions} from '../../reflux/AdmissionReflux.js';
import {ProtocolStore} from '../../reflux/ProtocolReflux.js';
import Settings from '../../GlobalSettings.js';
import RunProtocol from '../protocol/RunProtocol.js';


class AdmittedPatients extends Reflux.Component {
    constructor(props) {
        super(props);
        this.stores = [AdmissionStore, ProtocolStore];
        this.state = {

        };
    }

    componentDidMount() {
        AdmissionActions.load();
    }

    render() {
        // console.log("TO DO Needs fix (backend mostly)")
        // console.log(this.state);

        let i = 0;
        const columns = [{
            Header: () => <h5 className="h5-table">Name</h5>,
            id: "fullname",
            accessor: obj => obj.patient.fullname,
            Cell: props => <Link to={"patient/" + props.original.patient.id}>{props.value}</Link>
        }, {
            Header: () => <h5 className="h5-table">Room</h5>,
            id: "room",
            accessor: obj => obj.room,
            Cell: props => <span className='number'>{props.value}</span>
        }, {
            Header: () => <h5 className="h5-table">Last Measurement</h5>,
            id: "last_measure",
            accessor: obj => obj.last_measure,
            Cell: props => <span>{props.value}</span>
        }, {
            Header: () => <h5 className="h5-table">Next Measurement</h5>,
            id: "next_measure",
            accessor: obj => obj.next_measure,
            Cell: props => <span>{props.value}</span>
        }, {
            Header: () => <h5 className="h5-table">Physician</h5>,
            id: "doctor",
            accessor: obj => obj.physician,
            Cell: props => <span>{props.value}</span>
        }, {
            Header: () => <h5 className="h5-table"></h5>,
            id: "actions",
            filterable: false,
            accessor: obj => obj.patient.id,
            Cell: props =>  <RunProtocol patientID={props.value}/>
        }];


        return (
            <div className="Content">
                <div className="card">
                    <div className="card-header">
                        <i className="fa fa-users pull-left"></i>
                        <h3 className="text-center card-title h3-table">Admitted Patients</h3>

                        <Link to="/add/patient" className="pull-right btn btn-sm btn-success table-button">
                             <i className="fa fa-plus"></i></Link>
                    </div>
                    <div className="card-content">
                        <ReactTable
                            data={this.state.patientList}
                            columns={columns}
                            defaultPageSize={Settings.getPatientTableRows()}
                            filterable
                            loading={this.state.loading}
                            pageSizeOptions={[Settings.getPatientTableRows(), 50, 100]}/>

                    </div>

                </div>
            </div>
        );
    }
}

export default AdmittedPatients;
