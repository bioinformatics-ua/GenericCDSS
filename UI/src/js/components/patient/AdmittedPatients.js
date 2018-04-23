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
        console.log("TO DO Needs fix (backend mostly)")
        console.log(this.state)
        const columns = [{
            Header: () => <h5 className="h5-table">Nome</h5>,
            id: "fullname",
            accessor: obj => obj.patient.fullname,
            Cell: props => <Link to={"patient/" + props.original.patient.id}>{props.value}</Link>
        }, {
            Header: () => <h5 className="h5-table">Quarto</h5>,
            id: "room",
            accessor: obj => obj.room,
            Cell: props => <span className='number'>{props.value}</span>
        }, {
            Header: () => <h5 className="h5-table">Última medição</h5>,
            id: "last_measure",
            accessor: obj => obj.last_measure,
            Cell: props => <span>{props.value}</span>
        }, {
            Header: () => <h5 className="h5-table">Próxima medição</h5>,
            id: "next_measure",
            accessor: obj => obj.next_measure,
            Cell: props => <span>{props.value}</span>
        }, {
            Header: () => <h5 className="h5-table">Médico responsável</h5>,
            id: "doctor",
            accessor: obj => obj.physician,
            Cell: props => <span>{props.value}</span>
        }, {
            Header: () => <h5 className="h5-table"></h5>,
            id: "actions",
            filterable: false,
            accessor: obj => obj.id,
            Cell: props => <Link to={"/run/protocol/" + props.original.patient.id}>
                <button className="btn  btn-xs btn-success pull-right">Executar protocolo</button></Link>
        }];


        return (
            <div className="Content">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <i className="fa fa-users pull-left"></i>
                        <h3 className="text-center panel-title h3-table">Pacientes Internados</h3>

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
