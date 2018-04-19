import React, {Component} from 'react';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import {Link} from "react-router-dom";
import {ProtocolStore, ProtocolActions} from '../../reflux/ProtocolReflux.js';
import Settings from '../../GlobalSettings.js';

class SelectedProtocols extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedProtocols: this.props.selectedProtocols
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedProtocols.length !== this.props.selectedProtocols.length ) {
            this.setState({selectedProtocols: this.props.selectedProtocols});
        }
    }

    render() {
        const columns = [{
            Header: () => <h5 className="h5-table">Título</h5>,
            id: "title",
            accessor: obj => obj.title,
            Cell: props => <Link to={"/show/protocol/" + props.original.id}>{props.value}</Link>
        },{
            Header: () => <h5 className="h5-table">Inicio</h5>,
            id: "start_date",
            accessor: obj => obj.start_date,
            Cell: props => <span>{props.value}</span>
        },{
            Header: () => <h5 className="h5-table">Fim</h5>,
            id: "end_date",
            accessor: obj => obj.end_date,
            Cell: props => <span>{props.value}</span>
        },{
            Header: () => <h5 className="h5-table">Hora</h5>,
            id: "schedule",
            accessor: obj => obj.schedule,
            Cell: props => <span>{props.value}</span>
        }];

        return (
            <div className="Content">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <i className="fa fa-users pull-left"></i>
                        <h3 className="text-center panel-title h3-table">Protocolos selecionados</h3>
                    </div>
                    <div className="panel-content">
                        <ReactTable
                            data={this.state.selectedProtocols}
                            columns={columns}
                            defaultPageSize={this.props.rows === undefined ? Settings.getPatientTableRows() : this.props.rows}
                            filterable
                            pageSizeOptions={[this.props.rows === undefined ? Settings.getPatientTableRows() : this.props.rows, 50, 100]}/>

                    </div>
                </div>
            </div>
        );
    }
}

export default SelectedProtocols;