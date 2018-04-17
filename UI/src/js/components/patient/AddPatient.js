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
                <h2>Introduzir paciente</h2>
                <Select
                    placeholder="Procurar pelo paciente no sistema"
                    className="Select"
                    name="form-field-name"
                    value={this.state.selectedPatient}
                    onChange={this.handleChange}
                    options={this.state.patientListKeyValue}
                />
                <br/>
                <PatientInfo patientID={patientID} mode={mode}/>
                {
                    this.state.selectedPatient === undefined ? '' :
                        <span>
                            <h2>Complementos</h2>
                            <PatientComplementInfo patientID={patientID}/>
                        </span>
                }
            </div>
        );
    }
}

export default AddPatient;