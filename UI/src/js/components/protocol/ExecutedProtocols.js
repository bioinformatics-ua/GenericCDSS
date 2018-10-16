import React from 'react';
import Reflux from 'reflux';
import ReactTable from 'react-table'
import "react-table/react-table.css";
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
            Header: () => <h5 className="h5-table">Title</h5>,
            id: "title",
            accessor: obj => obj.title,
            Cell: props => <span>{props.value}</span>//<Link to={"/show/protocol/" + props.original.id}>{props.value}</Link>
        }, {
            Header: () => <h5 className="h5-table">Execution date</h5>,
            id: "end_date",
            accessor: obj => obj.execution_time,
            Cell: props => <span>{props.value}</span>
        }, {
            Header: () => <h5 className="h5-table">Physician</h5>,
            id: "physician",
            accessor: obj => obj.last_measure_physician,
            Cell: props => <span>{props.value}</span>
        }];

        return (
            <div className="card-content">
                <br/>
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