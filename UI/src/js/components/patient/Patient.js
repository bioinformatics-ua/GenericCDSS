import React, {Component} from 'react';
import PatientInfo from './PatientInfo.js';
import ClinicalVariables from './ClinicalVariables.js';

class Patient extends Component {
    render() {
        let patientID = this.props.match.params.object;

        return (
            <div className="Protocol">
                <h2>Informação do paciente</h2>
                <PatientInfo patientID={patientID}/>
                <h2>Dados clínicos</h2>
                <ClinicalVariables patientID={patientID}/>
            </div>
        );
    }
}

export default Patient;