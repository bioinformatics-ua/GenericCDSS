import React from 'react';
import Reflux from 'reflux';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import {Link} from "react-router-dom";
import {AdmissionStore, AdmissionActions} from '../../reflux/AdmissionReflux.js';
import {ProtocolStore} from '../../reflux/ProtocolReflux.js';
import Settings from '../../GlobalSettings.js';
import RunProtocolButton from '../buttons/RunProtocolButton.js';

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
        let i = 0;
        const columns = [{
            Header: () => <h5 className="h5-table"></h5>,
            id: "gender",
            maxWidth: 33,
            filterable: false,
            accessor: obj => obj.patient.gender,
            Cell: props => props.value === "M" ? <i className="icon-user_male"></i>: <i className="icon-user_female"></i>
        },{
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
            width: 250,
            Cell: props => <span>{props.value}</span>
        }, {
            Header: () => <h5 className="h5-table">Physician</h5>,
            id: "doctor",
            accessor: obj => obj.last_measure_physician,
            Cell: props => <span>{props.value}</span>
        }, {
            Header: () => <h5 className="h5-table"></h5>,
            id: "actions",
            filterable: false,
            accessor: obj => obj.patient.id,
            Cell: props =>  <RunProtocolButton refreshParent={this.componentDidMount} patientID={props.value}/>
        }];

        return (
            <div className="Content">
                <div className="card">
                    <div className="card-header">
                        <i className="fa fa-users pull-left"></i>
                        <h3 className="text-center card-title h3-table">Admitted Patients</h3>

                        <Link to="/add/patient" className="pull-right btn btn-sm btn-success table-button">
                             <strong><i className="fa fa-plus"></i> Insert new patient</strong></Link>
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
