import React from 'react';
import Reflux from 'reflux';
import PatientInfo from '../patient/PatientInfo.js';
import {ProtocolStore, ProtocolActions} from '../../reflux/ProtocolReflux.js';
import {AdmissionStore, AdmissionActions} from '../../reflux/AdmissionReflux.js';
import DisplayField from '../reusable/DisplayField.js';
import DisplayOptionsField from '../reusable/DisplayOptionsField.js';
import ButtonWithMsg from '../reusable/ButtonWithMsg.js';
import $ from 'jquery';

class AssignProtocolToPatient extends Reflux.Component {
    constructor(props) {
        super(props);
        this.stores = [ProtocolStore, AdmissionStore];
        this.state = {
            room: "",
            selectedProtocol: undefined,
            validated: false
        };

        ProtocolActions.setSelectedPatient(this.props.match.params.object);
    }

    componentDidMount() {
        //ScheduleActions.load();
        ProtocolActions.load();
    }

    modalHeader = () => {
        return (
            <div className="">
                <h1>Dados sobre o internamento</h1>
            </div>
        );
    };

    handleChange = (event) => {
        event.preventDefault();
        let key = $(event.target).data("keydata");
        let new_state = this.state;
        new_state[key] = event.target.value;
        this.setState({new_state});
    };

    modalContent = () => {
        return (
            <div className="card-body">
                <DisplayField onChange={this.handleChange} label={"Quarto"}
                              keydata={"room"} value={this.state.room}/>
            </div>
        );
    };

    admitPatient = () => {
        if(this.isProtocolValid()){
            let selectedProtocols = [{"id":this.state.selectedProtocol.value}]; //Provisorio, maybe because I am only selecting a protocol
            AdmissionActions.admitPatient(this.state.patientID, selectedProtocols, this.state.room);
        }
        else
            return false;
    };

    isProtocolValid = () => {
        this.setState({validated: true});
        return (this.state.selectedProtocol !== undefined &&
                this.state.room !== "" &&
                this.state.room.length < 10);
    };

    selectHandleChange = (selectedProtocol) => {
        if (selectedProtocol === null)
            selectedProtocol = undefined;
        this.setState({selectedProtocol});
    };

    render() {
        return (
            <div className="Patient">
                <h2>Admitting patient</h2>
                <PatientInfo mode={"admitting"} patientID={this.state.patientID}/>

                <h2>Protocol assignment</h2>
                <div className="card card-body PatientInfo mb-3">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <DisplayOptionsField options={this.state.protocolListKeyValue}
                                                 onChange={this.selectHandleChange}
                                                 label={"Protocol"}
                                                 keydata={"protocol"}
                                                 selection={this.state.selectedProtocol}
                                                 isInvalid={this.state.selectedProtocol === undefined && this.state.validated}
                                                 invalidMessage={"A protocol must be selected"}/>
                            {/*<ProtocolCostumization setProtocol={this.selectHandleChange}/>*/}
                        </div>
                        <div className="col-md-6 mb-3">
                            <DisplayField onChange={this.handleChange}
                                          label={"Quarto"}
                                          keydata={"room"}
                                          value={this.state.room}
                                          isInvalid={(this.state.room === "" || this.state.room.length >= 10) && this.state.validated}
                                          invalidMessage={"The room field is invalid"}/>
                        </div>
                    </div>
                </div>
                <hr/>
                <div>
                    <ButtonWithMsg icon={"fa fa-plus"}
                                   label={"Admit"}
                                   message={"Patient admitted with success."}
                                   messageTitle={"Admitted!"}
                                   className={"btn btn-success btn-100 pull-right"}
                                   action={this.admitPatient}
                                   redirect={"/admittedpatients"} />
                </div>
            </div>
        )
    }
}

export default AssignProtocolToPatient;



