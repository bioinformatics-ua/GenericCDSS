import React, {Component} from 'react';
import PatientInfo from './PatientInfo.js';
import PatientComplementInfo from './PatientComplementInfo.js';

class ShowPatient extends Component {
    render() {
        let patientID = this.props.match.params.object;

        return (
            <div className="Patient">
                <h2>Patient information</h2>
                <PatientInfo mode={"show"} patientID={patientID}/>
                <h2>Additional Information</h2>
                <PatientComplementInfo patientID={patientID}/>
            </div>
        );
    }
}

export default ShowPatient;