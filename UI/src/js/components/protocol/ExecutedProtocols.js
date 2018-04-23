import React from 'react';
import Reflux from 'reflux';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import {Link} from "react-router-dom";
import {ProtocolStore, ProtocolActions} from '../../reflux/ProtocolReflux.js';

class ExecutedProtocols extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ProtocolStore;
        this.state = {};
    }

    componentDidMount() {
        ProtocolActions.loadExecutedProtocols(this.props.patientID);
    }

    render() {
        const columns = [{
            Header: () => <h5 className="h5-table">Título</h5>,
            id: "title",
            accessor: obj => obj.title,
            Cell: props => <span>{props.value}</span>//<Link to={"/show/protocol/" + props.original.id}>{props.value}</Link>
        }, {
            Header: () => <h5 className="h5-table">Data de realização</h5>,
            id: "end_date",
            accessor: obj => obj.execution_time,
            Cell: props => <span>{props.value}</span>
        }];

        return (
            <div className="AssignedProtocols">
                <ReactTable
                    data={this.state.executedProtocols}
                    columns={columns}
                    defaultPageSize={5}
                    filterable/>
            </div>
        );
    }
}

export default ExecutedProtocols;