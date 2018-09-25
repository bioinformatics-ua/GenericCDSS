import React, {Component} from 'react';
import {PatientActions} from '../../reflux/PatientReflux.js';
import {AdmissionActions} from '../../reflux/AdmissionReflux.js';
import {ProtocolActions} from '../../reflux/ProtocolReflux.js';
import History from '../globalComponents/History.js';
import PatientStatus from '../patient/PatientStatus.js';
import ButtonWithMsg from '../reusable/ButtonWithMsg.js';

class PatientButtonBar extends Component {
    addPatient = (event) => {
        PatientActions.addPatient();
    };

    admitPatient = (event) => {
        event.preventDefault();
        ProtocolActions.cleanSelectedProtocols();
        History.push('/assignprotocol/' + this.props.patient.id);
    };

    dischargePatient = () => {
        AdmissionActions.dischargePatient(this.props.patient.id);
    };

    render() {
        let patientStatus = this.props.patient.status;

        switch (this.props.mode){
            case "show":
                if(patientStatus === PatientStatus.DISCHARGED)
                    return(
                        <div>
                            <div className="PatientInfo-buttons-controler pull-right">
                                <button className="btn btn-success btn-100" onClick={this.admitPatient}>
                                    <i className="fa fa-plus"></i>&nbsp;Admit</button>
                            </div>
                        </div>
                    );
                if(patientStatus === PatientStatus.ADMITTED)
                    return(
                        <div>
                            <ButtonWithMsg icon={"fa fa-minus"}
                                           label={"Dismiss"}
                                           message={"Patient dismiss with success."}
                                           messageTitle={"Dismiss!"}
                                           className={"btn btn-danger btn-100 pull-right"}
                                           action={this.dischargePatient}
                                           redirect={"/admittedpatients"}
                                           confirmationMsg={"The patient will be dismissed, but he can be admitted in the future."}
                                           confirmationMsgOkButton={"Yes, dismiss the patient!"}/>
                        </div>
                    );
                break;

            case "add":
                return(
                    <div>
                        <div className="PatientInfo-buttons-controler pull-right">
                            <button className="btn btn-success btn-100" onClick={this.addPatient}>
                                <i className="fa fa-plus"></i>&nbsp;Add</button>
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
