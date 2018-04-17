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
        let readOnly = this.state.mode === "show";
        return (
            <div className="panel panel-default panel-body PatientInfo">
                <div className="row">
                    <div className="col-md-2">
                        {<img className="profile-img" alt="Not found"
                              src="http://www.attractivepartners.co.uk/wp-content/uploads/2017/06/profile.jpg"/>}
                    </div>
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-6">
                                <DisplayField readOnly={readOnly} onChange={this.handleChange} label={"Nome"}
                                              keydata={"first_name"} value={this.state.patient.first_name}/>
                            </div>
                            <div className="col-md-6">
                                <DisplayField readOnly={readOnly} onChange={this.handleChange} label={"Apelido"}
                                              keydata={"last_name"} value={this.state.patient.last_name}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <DisplayField readOnly={readOnly} onChange={this.handleChange} label={"Género"}
                                              keydata={"gender"} value={this.state.patient.fullgender}/>
                            </div>
                            <div className="col-md-6">
                                <DisplayField readOnly={readOnly} onChange={this.handleChange}
                                              label={"Data de Nascimento"}
                                              keydata={"birthdate"} value={this.state.patient.birthdate}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <DisplayField readOnly={readOnly} onChange={this.handleChange} label={"Contacto"}
                                              keydata={"phone"} value={this.state.patient.phone}/>
                            </div>
                            <div className="col-md-6">
                                <DisplayField readOnly={readOnly} onChange={this.handleChange} label={"Email"}
                                              keydata={"email"} value={this.state.patient.email}/>
                            </div>
                        </div>
                    </div>
                </div>
                <PatientButtonBar mode={this.state.mode} patient={this.state.patient}/>
            </div>
        );
    }
}

export default PatientInfo;
