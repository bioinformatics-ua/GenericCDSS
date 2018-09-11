import React from 'react';
import Reflux from 'reflux';
import {ProtocolStore, ProtocolActions} from '../../reflux/ProtocolReflux.js';
//import Flowchart from 'react-simple-flowchart';

import ReactTable from 'react-table'
import "react-table/react-table.css";
//import {Link} from "react-router-dom";
//import {AdmissionStore, AdmissionActions} from '../../reflux/AdmissionReflux.js';
//import Settings from '../../GlobalSettings.js';

import DisplayField from '../reusable/DisplayField.js';

class ShowProtocol extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ProtocolStore;
        this.state = {
            protocolID: this.props.match.params.object
        };
    }

    componentDidMount() {
        ProtocolActions.loadProtocol(this.state.protocolID);
    }


    render() {
        const columns = [{
            Header: () => <h5 className="h5-table">ID</h5>,
            id: "id",
            accessor: obj => obj.internalId,
            Cell: props => <span>{props.value}</span>
        },{
            Header: () => <h5 className="h5-table">Type</h5>,
            id: "type",
            accessor: obj => obj.type,
            Cell: props => <span>{props.value}</span>
        },{
            Header: () => <h5 className="h5-table">Next element</h5>,
            id: "next",
            accessor: obj => obj.nextElement,
            Cell: props => <span>{props.value}</span>
        },{
            Header: () => <h5 className="h5-table">Clinical Variable</h5>,
            id: "cv",
            accessor: obj => obj.clinicalVariable,
            Cell: props => <span>{props.value !== undefined ? props.value.variable : ""}</span>
        },{
            Header: () => <h5 className="h5-table">Condition</h5>,
            id: "cond",
            accessor: obj => obj.condition,
            Cell: props => <span>{props.value}</span>
        },{
            Header: () => <h5 className="h5-table">Action</h5>,
            id: "action",
            accessor: obj => obj.action,
            Cell: props => <span>{props.value}</span>
        }];
        //duplicar, editar, eliminar e tornar publico
        return (
            <div className="ShowProtocol">
                <h2>Protocol</h2>
                <div className="panel panel-default panel-body PatientInfo">
                    <div className="row">
                        <div className="col-md-12">
                            <DisplayField readOnly={true} onChange={this.handleChange} label={"Title"}
                                          keydata={"first_name"} value={this.state.protocol.title}/>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <DisplayField readOnly={true} onChange={this.handleChange} label={"Type"}
                                          keydata={"last_name"} value={"Simple"}/>
                        </div>
                          <div className="col-md-4">
                            <DisplayField readOnly={true} onChange={this.handleChange} label={"Permissions"}
                                          keydata={"first_name"} value={"Public"}/>
                        </div>
                        <div className="col-md-4">

                            <div className="btn-group PatientInfo-buttons-controler pull-right">

                                <button className="btn btn-sm btn-info btn-100" onClick={this.handleChange}><strong><i className="fa fa-code-fork"></i>&nbsp;Fork</strong></button>
                                <button className="btn btn-sm btn-warning btn-100" onClick={this.handleChange}><strong><i className="fa fa-pencil"></i>&nbsp;Edit</strong></button>
                                <button className="btn btn-sm btn-danger btn-100" onClick={this.handleChange}><strong><i className="fa fa-times"></i>&nbsp;Remove</strong></button>
                            </div>
                        </div>

                </div>
            </div>

                {/*<h2>Protocol: {this.state.protocol.title}</h2>*/}
                <div className="panel panel-default">
                <div className="panel-content">
                    <ReactTable
                        data={this.state.protocolData}
                        columns={columns}
                        defaultPageSize={"13"}
                        filterable
                        pageSizeOptions={[13, 50, 100]}
                        defaultSorted={[{
                            id: 'id',
                            asc: true,
                        }]}/>

                    {/* Button to add variables
                    <div className="CVRepresentationGroup-buttons-controler pull-right">
                        <button className="btn btn-success btn-100" onClick={this.openModal}>
                            <i className="fa fa-plus"></i>&nbsp;Add condition
                        </button>
                    </div>*/}
                </div>
            </div>
            </div>
        );
    }
}

export default ShowProtocol;

/*

 export default class ShowProtocol extends Component {

 constructor(props) {
 super(props);
 const code =
 `st=>start: Begin
 e=>end: End
 op1=>operation: Operation 1|department1
 op2=>operation: Operation 2|department2
 sub=>subroutine: Go To Google|external:>http://www.google.com
 cond=>condition: Google?
 st(right)->op1(right)->op2(right)->cond(yes)->sub(bottom)
 cond(no)->e`;

 const opt = {
 x: 0,
 y: 0,
 'line-width': 3,
 'line-length': 50,
 'text-margin': 10,
 'font-size': 14,
 'font-color': 'black',
 'line-color': 'black',
 'element-color': 'black',
 fill: 'white',
 'yes-text': 'yes',
 'no-text': 'no',
 'arrow-end': 'block',
 scale: 1,
 symbols: {
 start: {
 'font-color': 'red',
 'element-color': 'green',
 'font-weight': 'bold',
 },
 end: {
 'font-color': 'red',
 'element-color': 'green',
 'font-weight': 'bold',
 },
 },
 flowstate: {
 department1: {fill: 'pink'},
 department2: {fill: 'yellow'},
 external: {fill: 'green'},
 },
 };

 this.state = {
 code,
 opt,
 elementText: 'none',
 }
 }

 handleCodeChange(e) {
 this.setState({
 code: e.target.value,
 });

 }

 handleOptChange(e) {
 this.setState({
 opt: JSON.parse(e.target.value),
 });

 }

 render() {
 const {code, opt, elementText} = this.state;
 return (
 <div>
 <p>Edit flowchart in real time!</p>
 <textarea
 cols="100"
 rows="10"
 value={code}
 onChange={(e) => this.handleCodeChange(e)}
 />
 <br /><br />
 <p>Flowchart options</p>
 <textarea cols="100"
 rows="10"
 value={JSON.stringify(opt)}
 onChange={(e) => this.handleOptChange(e)}
 />
 <br /><br />
 <p>Result</p>
 <p>Last Clicked Node: <strong>{elementText}</strong></p>
 <Flowchart
 chartCode={code}
 options={opt}
 onClick={elementText => this.setState({elementText})}
 />
 </div>
 );
 }
 }
 */