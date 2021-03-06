import React from 'react';
import Reflux from 'reflux';
import {PatientStore, PatientActions} from '../../reflux/PatientReflux.js';
import DisplayField from '../reusable/DisplayField.js';
import DisplayOptionsField from '../reusable/DisplayOptionsField.js';
import PatientButtonBar from '../buttons/PatientButtonBar.js';
import $ from 'jquery';

class PatientInfo extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = PatientStore;
        this.state = {
            mode: this.props.mode === undefined ? "show" : this.props.mode,
            validated: false
        };
    }

    componentDidMount() {
        PatientActions.loadPatient(this.props.patientID);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.patientID !== this.props.patientID)
            this.updateInitialState();
    }

    updateInitialState = () => {
        PatientActions.loadPatient(this.props.patientID);
        this.setState({mode: this.props.mode === undefined ? "show" : this.props.mode});
    };

    handleChange = (event) => {
        event.preventDefault();
        let key = $(event.target).data("keydata");
        let new_patient = this.state.patient;
        new_patient[key] = event.target.value;
        this.setState({patient: new_patient});
    };

    selectHandleChange = (fullgender) => {
        if (fullgender === null)
            fullgender = undefined;

        let new_patient = this.state.patient;
        new_patient["gender"] = fullgender.value;
        this.setState({new_patient});
    };

    patientIsValid = () => {
        this.setState({validated: true});
        return (this.state.patient.first_name !== "" &&
                this.state.patient.last_name !== "" &&
                this.state.patient.gender !== undefined &&
                this.state.patient.birthdate !== "");
    };

    render() {
        let readOnly = this.state.mode === "show" || this.state.mode === "admitting";
        const genderOptions = [
            {value: 'M', label: 'Male'},
            {value: 'F', label: 'Female'}
        ];

        return (
            <div className="card card-body PatientInfo mb-3">
                <div className="col-md-12">
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <DisplayField readOnly={readOnly}
                                          onChange={this.handleChange}
                                          label={"First Name"}
                                          keydata={"first_name"}
                                          value={this.state.patient.first_name}
                                          isInvalid={this.state.patient.first_name === "" && this.state.validated}
                                          invalidMessage={"The first name field is empty"}/>
                        </div>
                        <div className="col-md-6">
                            <DisplayField readOnly={readOnly}
                                          onChange={this.handleChange}
                                          label={"Last Name"}
                                          keydata={"last_name"}
                                          value={this.state.patient.last_name}
                                          isInvalid={this.state.patient.last_name === "" && this.state.validated}
                                          invalidMessage={"The last name field is empty"}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <DisplayOptionsField readOnly={readOnly}
                                                 options={genderOptions}
                                                 onChange={this.selectHandleChange}
                                                 label={"Gender"}
                                                 keydata={"gender"}
                                                 value={this.state.patient.fullgender}
                                                 selection={this.state.patient.gender}
                                                 isInvalid={this.state.patient.gender === undefined && this.state.validated}
                                                 invalidMessage={"A gender must be selected"}/>
                        </div>
                        <div className="col-md-6">
                            <DisplayField readOnly={readOnly}
                                          onChange={this.handleChange}
                                          label={"Birthdate"}
                                          keydata={"birthdate"}
                                          value={this.state.patient.birthdate}
                                          type={"date"}
                                          isInvalid={this.state.patient.birthdate === "" && this.state.validated}
                                          invalidMessage={"The birtdate field is empty"}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <DisplayField readOnly={readOnly}
                                          onChange={this.handleChange}
                                          label={"Phone"}
                                          keydata={"phone"}
                                          value={this.state.patient.phone}
                                          isWarning={this.state.patient.phone === "" && this.state.validated}
                                          invalidMessage={"The phone field is empty (Optional)"}/>
                        </div>
                        <div className="col-md-6">
                            <DisplayField readOnly={readOnly}
                                          onChange={this.handleChange}
                                          label={"Email"}
                                          keydata={"email"}
                                          value={this.state.patient.email}
                                          isWarning={this.state.patient.email === "" && this.state.validated}
                                          invalidMessage={"The email field is empty (Optional)"}/>
                        </div>
                    </div>

                <PatientButtonBar mode={this.state.mode} patient={this.state.patient} patientIsValid={this.patientIsValid}/>

                </div>
            </div>
        );
    }
}

export default PatientInfo;
