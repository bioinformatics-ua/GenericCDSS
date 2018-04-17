import React from 'react';
import Reflux from 'reflux';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import {Link} from "react-router-dom";
import {AdmissionStore, AdmissionActions} from '../../reflux/AdmissionReflux.js';
import Settings from '../../GlobalSettings.js';

class AdmittedPatients extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = AdmissionStore;
    }

    componentDidMount() {
        AdmissionActions.load();
    }

    render() {
        console.log("TO DO Needs fix")
        const columns = [{
            Header: () => <h5 className="h5-table">Nome</h5>,
            id: "fullname",
            accessor: obj => obj.patient.fullname,
            Cell: props => <Link to={"patient/" + props.original.patient.id}>{props.value}</Link>
        }, {
            Header: () => <h5 className="h5-table">Quarto</h5>,
            id: "room",
            accessor: obj => obj.patient.room,
            Cell: props => <span className='number'>{props.value}</span>
        }, {
            Header: () => <h5 className="h5-table">to do Última medição</h5>,
            id: "doctorWRONG",
            accessor: obj => obj.physician.user.fullname,
            Cell: props => <span>{props.value}</span>
        }, {
            Header: () => <h5 className="h5-table">to do Próxima medição</h5>,
            id: "doctor2",
            accessor: obj => obj.physician.user.fullname,
            Cell: props => <span>{props.value}</span>
        }, {
            Header: () => <h5 className="h5-table">to do Médico responsável</h5>,
            id: "doctor",
            accessor: obj => obj.physician.user.fullname,
            Cell: props => <span>{props.value}</span>
        }];


        return (
            <div className="Content">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <i className="fa fa-users pull-left"></i>
                        <h3 className="text-center panel-title h3-table">Pacientes</h3>

                        <Link to="/add/patient" className="pull-right btn btn-xs btn-success table-button">
                             <i className="fa fa-plus"></i></Link>
                    </div>
                    <div className="panel-content">
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
