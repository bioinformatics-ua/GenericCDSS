import React from 'react';
import Reflux from 'reflux';
import {PatientStore, PatientActions} from '../../reflux/PatientReflux.js';
import PatientInfo from './PatientInfo.js';
import PatientComplementInfo from './PatientComplementInfo.js';
import Select from 'react-select';

class AddPatient extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = PatientStore;
        this.state = {
            selectedPatient: undefined
        }
    }

    componentDidMount() {
        PatientActions.loadDischargedPatients();
    }

    handleChange = (selectedPatient) => {
        if (selectedPatient === null)
            selectedPatient = undefined;
        this.setState({selectedPatient});
    };

    render() {
        let mode = this.state.selectedPatient === undefined ? "add" : "show";
        let patientID = this.state.selectedPatient === undefined ? undefined : this.state.selectedPatient.value;

        return (
            <div className="AddPatient">
                <h2><i className="fa fa-user-md"></i>&nbsp;Insert patient</h2>
                <Select
                    placeholder="Search for the patient in the system"
                    className="Selectx2"
                    name="form-field-name"
                    value={this.state.selectedPatient}
                    onChange={this.handleChange}
                    options={this.state.patientListKeyValue}/>
                <br/>
                <PatientInfo patientID={patientID} mode={mode}/>
                {
                    this.state.selectedPatient === undefined ? '' :
                        <span>
                            <h2><i className="fa fa-heartbeat"></i>&nbsp;Additional information</h2>
                            <PatientComplementInfo patientID={patientID}/>
                        </span>
                }
            </div>
        );
    }
}

export default AddPatient;