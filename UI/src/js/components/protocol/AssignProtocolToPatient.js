import React from 'react';
import Reflux from 'reflux';
import PatientInfo from '../patient/PatientInfo.js';
import {ScheduleStore, ScheduleActions} from '../../reflux/ScheduleReflux.js';
import {ProtocolStore, ProtocolActions} from '../../reflux/ProtocolReflux.js';
import {AdmissionStore, AdmissionActions} from '../../reflux/AdmissionReflux.js';
import DisplayField from '../reusable/DisplayField.js';
import ProtocolCostumization from './ProtocolCostumization.js';
import ButtonWithMsg from '../reusable/ButtonWithMsg.js';
import $ from 'jquery';

class AssignProtocolToPatient extends Reflux.Component {
    constructor(props) {
        super(props);
        this.stores = [ScheduleStore, ProtocolStore, AdmissionStore];
        this.state = {
            room: undefined,
            selectedProtocol: []
        };

        ProtocolActions.setSelectedPatient(this.props.match.params.object);
    }

    componentDidMount() {
        ScheduleActions.load();
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
        let selectedProtocols = [{"id":this.state.selectedProtocol.selectedProtocol["value"]}]; //Provisorio, maybe because I am only selecting a protocol
        AdmissionActions.admitPatient(this.state.patientID, selectedProtocols, this.state.room);
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
                            <ProtocolCostumization setProtocol={this.selectHandleChange}/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <DisplayField onChange={this.handleChange} label={"Quarto"}
                                          keydata={"room"} value={this.state.room}/>
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



