import React, {Component} from 'react';
import PatientInfo from './PatientInfo.js';
import PatientComplementInfo from './PatientComplementInfo.js';

class ShowPatient extends Component {
    render() {
        let patientID = this.props.match.params.object;

        return (
            <div className="Patient">
                <h2>Informação do paciente</h2>
                <PatientInfo mode={"show"} patientID={patientID}/>
                <h2>Complementos</h2>
                <PatientComplementInfo patientID={patientID}/>
            </div>
        );
    }
}

export default ShowPatient;