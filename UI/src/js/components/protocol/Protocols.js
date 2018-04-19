import React from 'react';
import Reflux from 'reflux';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import {Link} from "react-router-dom";
import {ProtocolStore, ProtocolActions} from '../../reflux/ProtocolReflux.js';
import Settings from '../../GlobalSettings.js';

class Protocols extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ProtocolStore;
    }

    componentDidMount() {
        ProtocolActions.load();
    }

    render() {
        let columns = [];
        if (this.props.selectColumn === true)
            columns.push({
                Header: () => <h5 className="h5-table"></h5>,
                id: "selection",
                maxWidth: 33,
                filterable: false,
                accessor: obj => obj.id,
                Cell: props =>  <button data-protocolid={props.value} data-protocoltitle={props.original.title} className="btn btn-xxs btn-xs btn-success" onClick={this.props.openModal}>
                                    <i data-protocolid={props.value} data-protocoltitle={props.original.title} className="fa fa-plus"></i>
                                </button>
            });

        columns.push({
            Header: () => <h5 className="h5-table">Título</h5>,
            id: "title",
            accessor: obj => obj.title,
            Cell: props => <Link to={"/show/protocol/" + props.original.id}>{props.value}</Link>
        });
        columns.push({
            Header: () => <h5 className="h5-table">Descrição</h5>,
            id: "description",
            accessor: obj => obj.description,
            Cell: props => <span>{props.value}</span>
        });

        return (
            <div className="Content">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <i className="fa fa-users pull-left"></i>
                        <h3 className="text-center panel-title h3-table">Protocolos</h3>
                    </div>
                    <div className="panel-content">
                        <ReactTable
                            data={this.state.protocolList}
                            columns={columns}
                            defaultPageSize={this.props.rows === undefined ? Settings.getPatientTableRows() : this.props.rows}
                            filterable
                            loading={this.state.loading}
                            pageSizeOptions={[this.props.rows === undefined ? Settings.getPatientTableRows() : this.props.rows, 50, 100]}/>

                    </div>
                </div>
            </div>
        );
    }
}

export default Protocols;
