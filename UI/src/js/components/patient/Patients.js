import React from 'react';
import Reflux from 'reflux';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import {Link} from "react-router-dom";
import {PatientStore, PatientActions} from '../../reflux/PatientReflux.js';
import CVSummary from './CVSummary.js';

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
            Header: 'Nome',
            accessor: 'fullname',
            Cell: props => <Link to={"patient/" + props.original.id}>{props.value}</Link>
        }, {
            Header: 'Quarto',
            accessor: 'room',
            Cell: props => <span className='number'>{props.value}</span>
        }];

        return (
            <div className="Content">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <i className="fa fa-users pull-left"></i>
                        <h3 className="text-center panel-title">Pacientes</h3>

                        <Link to="/add/patient" className="pull-right btn btn-xs btn-success table-button">
                             <i className="fa fa-plus"></i> Adicionar novo paciente</Link>
                    </div>
                    <div className="panel-content">
                        <ReactTable
                            data={this.state.patientList}
                            columns={columns}
                            SubComponent={row => {
                                return (<CVSummary patientID={row} />);
                            }}
                            defaultPageSize={10}
                            filterable
                            loading={this.state.loading}/>
                    </div>

                </div>
            </div>
        );
    }
}

export default Patients;
