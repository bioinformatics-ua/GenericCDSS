import React, {Component} from 'react';
import {PatientActions} from '../../reflux/PatientReflux.js';
import {AdmissionActions} from '../../reflux/AdmissionReflux.js';
import {ProtocolActions} from '../../reflux/ProtocolReflux.js';
import History from '../globalComponents/History.js';
import PatientStatus from './PatientStatus.js';

class PatientButtonBar extends Component {
    addPatient = (event) => {
        event.preventDefault();
        PatientActions.addPatient();
        History.push('/patients');
    };

    admitPatient = (event) => {
        event.preventDefault();
        ProtocolActions.cleanSelectedProtocols();
        History.push('/assignprotocol/' + this.props.patient.id);
    };

    dischargePatient = (event) => {
        event.preventDefault();
        AdmissionActions.dischargePatient(this.props.patient.id);
        History.push('/admittedpatients');
    };

    render() {
        let patientStatus = this.props.patient.status;

        switch (this.props.mode){
            case "show":
                if(patientStatus === PatientStatus.DISCHARGED)
                    return(
                        <div>
                            <div className="PatientInfo-buttons-controler pull-right">
                                <button className="btn btn-success btn-100" onClick={this.admitPatient}>Admit</button>
                            </div>
                        </div>
                    );
                if(patientStatus === PatientStatus.ADMITTED)
                    return(
                        <div>
                            <div className="PatientInfo-buttons-controler pull-right">
                                <button className="btn btn-success btn-100" onClick={this.dischargePatient}>Dismiss</button>
                            </div>
                        </div>
                    );
                break;

            case "add":
                return(
                    <div>
                        <div className="PatientInfo-buttons-controler pull-right">
                            <button className="btn btn-success btn-100" onClick={this.addPatient}>Add</button>
                        </div>
                    </div>
                );
                //break;

            case "edit":
                return(
                    <div>TO DO
                    </div>
                );
                //break;
            case "admitting": return(<div></div>);

            default: return(<div></div>);
        }
        return(<div></div>);
    }
}

export default PatientButtonBar;
