import React from 'react';
import Reflux from 'reflux';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import {Link} from "react-router-dom";
import {ProtocolStore, ProtocolActions} from '../../reflux/ProtocolReflux.js';

class SelectedProtocols extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ProtocolStore;
        this.state = {};
    }

    componentDidMount() {
        ProtocolActions.loadAssignedProtocols(this.props.patientID);
    }

    render() {
        const columns = [{
            Header: () => <h5 className="h5-table">Title</h5>,
            id: "title",
            accessor: obj => obj.title,
            Cell: props => <Link to={"/show/protocol/" + props.original.protocol}>{props.value}</Link>
        }, {
            Header: () => <h5 className="h5-table">Description</h5>,
            id: "start_date",
            accessor: obj => obj.description,
            Cell: props => <span>{props.value}</span>
        }, {
            Header: () => <h5 className="h5-table">Physician</h5>,
            id: "physician",
            accessor: obj => obj.admission_physician,
            Cell: props => <span>{props.value}</span>
        }];

        return (
            <div className="card-content">
                <br/>
                <ReactTable
                    data={this.state.assignedProtocols}
                    columns={columns}
                    defaultPageSize={5}
                    filterable/>
            </div>
        );
    }
}

export default SelectedProtocols;