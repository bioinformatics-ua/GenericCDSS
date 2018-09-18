import React from 'react';
import Reflux from 'reflux';
import {PatientStore, PatientActions} from '../../reflux/PatientReflux.js';
import DisplayField from '../reusable/DisplayField.js';
import PatientButtonBar from './PatientButtonBar.js';
import $ from 'jquery';

class PatientInfo extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = PatientStore;
        this.state = {
            mode: this.props.mode === undefined ? "show" : this.props.mode
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

    render() {
        let readOnly = this.state.mode === "show" || this.state.mode === "admitting";
        return (
            <div className="card card-body PatientInfo">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-6">
                            <DisplayField readOnly={readOnly} onChange={this.handleChange} label={"First Name"}
                                          keydata={"first_name"} value={this.state.patient.first_name}/>
                        </div>
                        <div className="col-md-6">
                            <DisplayField readOnly={readOnly} onChange={this.handleChange} label={"Last Name"}
                                          keydata={"last_name"} value={this.state.patient.last_name}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <DisplayField readOnly={readOnly} onChange={this.handleChange} label={"Gender"}
                                          keydata={"gender"} value={this.state.patient.fullgender}/>
                        </div>
                        <div className="col-md-6">
                            <DisplayField readOnly={readOnly} onChange={this.handleChange}
                                          label={"Birthdate"}
                                          keydata={"birthdate"} value={this.state.patient.birthdate}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <DisplayField readOnly={readOnly} onChange={this.handleChange} label={"Phone"}
                                          keydata={"phone"} value={this.state.patient.phone}/>
                        </div>
                        <div className="col-md-6">
                            <DisplayField readOnly={readOnly} onChange={this.handleChange} label={"Email"}
                                          keydata={"email"} value={this.state.patient.email}/>
                        </div>
                    </div>

                <PatientButtonBar mode={this.state.mode} patient={this.state.patient}/>

                </div>
            </div>
        );
    }
}

export default PatientInfo;
