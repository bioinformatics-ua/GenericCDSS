import React from 'react';
import Reflux from 'reflux';
import PropTypes from 'prop-types';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import {Link} from "react-router-dom";
import {ProtocolStore, ProtocolActions} from '../../reflux/ProtocolReflux.js';
import Settings from '../../GlobalSettings.js';
import ProtocolType from "./ProtocolType.js";

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
                Cell: props =>  <button data-protocolid={props.value} data-protocoltitle={props.original.title} className="btn btn-xxs btn-sm btn-success" onClick={this.props.openModal}>
                                    <i data-protocolid={props.value} data-protocoltitle={props.original.title} className="fa fa-plus"></i>
                                </button>
            });

        columns.push({
            Header: () => <h5 className="h5-table">Title</h5>,
            id: "title",
            accessor: obj => obj.title,
            Cell: props => <Link to={"/show/protocol/" + props.original.id}>{props.value}</Link>
        });
        columns.push({
            Header: () => <h5 className="h5-table">Description</h5>,
            id: "description",
            accessor: obj => obj.description,
            Cell: props => <span>{props.value}</span>
        });
        columns.push({
            Header: () => <h5 className="h5-table">Type</h5>,
            id: "type",
            accessor: obj => obj.type,
            Cell: props => <span>{ProtocolType.toString(props.value)}</span>
        });

        return (
            <div className="Content">
                <div className="card">
                    <div className="card-header">
                        <i className="fa fa-sitemap pull-left"></i>
                        <h3 className="text-center card-title h3-table">Protocols</h3>
                        <Link to="/add/protocol" className="pull-right btn btn-sm btn-success table-button">
                             <i className="fa fa-plus"></i></Link>
                    </div>
                    <div className="card-content">
                        <ReactTable
                            data={this.state.protocolList}
                            columns={columns}
                            defaultPageSize={this.props.rows}
                            filterable
                            loading={this.state.loading}
                            pageSizeOptions={[this.props.rows, 50, 100]}/>

                    </div>
                </div>
            </div>
        );
    }

    static propTypes = {
        /**
         *  Number of row in the table
         * */
        rows: PropTypes.number
    };
}


Protocols.defaultProps = {
    rows: Settings.getPatientTableRows()
};

export default Protocols;
