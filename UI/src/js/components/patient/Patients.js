import React from 'react';
import Reflux from 'reflux';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import {Link} from "react-router-dom";
import {PatientStore, PatientActions} from '../../reflux/PatientReflux.js';
import Settings from '../../GlobalSettings.js';

class Patients extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = PatientStore;
    }

    componentDidMount() {
        PatientActions.load();
    }

    render() {
        const columns = [{
            Header: () => <h5 className="h5-table">Nome</h5>,
            accessor: 'fullname',
            Cell: props => <Link to={"patient/" + props.original.id}>{props.value}</Link>
        }, {
            Header: <h5 className="h5-table">Quarto</h5>,
            accessor: 'room',
            Cell: props => <span className='number'>{props.value}</span>
        }, {
            Header: <h5 className="h5-table">to do Última medição</h5>,
            accessor: 'fullname',
            Cell: props => <span>{props.value}</span>
        }, {
            Header: <h5 className="h5-table">to do Próxima medição</h5>,
            accessor: 'fullname',
            Cell: props => <span>{props.value}</span>
        }, {
            Header: <h5 className="h5-table">to do Médico responsável</h5>,
            accessor: 'fullname',
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

export default Patients;
