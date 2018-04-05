import React, {Component} from 'react';
import Reflux from 'reflux';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import { Link } from "react-router-dom";
import { PatientStore, PatientActions } from '../reflux/PatientReflux.js';

class Content extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = PatientStore;
    }

    componentDidMount(){
        PatientActions.load();
    }

    render() {
        const columns = [ {
            Header: 'Nome',
            accessor: 'fullname',
            Cell: props => <Link to={"protocol/" + props.original.id}>{props.value}</Link>
        },{
            Header: 'Quarto',
            accessor: 'room',
            Cell: props => <span className='number'>{props.value}</span>
        }];

        console.log(this.state)
        return (
            <div className="Content">
                <ReactTable
                    data={this.state.patientList}
                    columns={columns}
                    SubComponent={row => {
                        return (
                          <div style={{ padding: "20px" }}>
                              Patient Info or something else (TO DO)
                          </div>
                        );
                      }}
                />
            </div>
        );
    }
}

export default Content;