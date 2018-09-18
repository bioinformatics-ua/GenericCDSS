import React from 'react';
import Reflux from 'reflux';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import {Link} from "react-router-dom";
import {PatientStore, PatientActions} from '../../reflux/PatientReflux.js';
import Settings from '../../GlobalSettings.js';
import PatientStatus from './PatientStatus.js';

class AllPatients extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = PatientStore;
    }

    componentDidMount() {
        PatientActions.load();
    }

    render() {
        const columns = [{
            Header: () => <h5 className="h5-table">Nome completo</h5>,
            id: "fullname",
            accessor: obj => obj.fullname,
            Cell: props => <Link to={"patient/" + props.original.id}>{props.value}</Link>
        },{
            Header:() =>  <h5 className="h5-table">Estado</h5>,
            id: "status",
            accessor: obj => obj.status,
            Cell: props => <span>{PatientStatus.toString(props.value)}</span>
        },{
            Header:() =>  <h5 className="h5-table">Contacto</h5>,
            id: "contacto",
            accessor: obj => obj.phone,
            Cell: props => <span>{props.value}</span>
        },{
            Header: () => <h5 className="h5-table">Email</h5>,
            id: "email",
            accessor: obj => obj.email,
            Cell: props => <span>{props.value}</span>
        }];


        return (
            <div className="Content">
                <div className="card">
                    <div className="card-header">
                        <i className="fa fa-users pull-left"></i>
                        <h3 className="text-center card-title h3-table">Pacientes</h3>

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
                            pageSizeOptions={[Settings.getPatientTableRows(), 50, 100]}
                            defaultSorted={[{
                                id: 'status',
                                asc: true,
                            }]}/>

                    </div>
                </div>
            </div>
        );
    }
}

export default AllPatients;
