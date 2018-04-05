import React, {Component} from 'react';
import Reflux from 'reflux';
import {PatientStore, PatientActions} from '../../reflux/PatientReflux.js';

class PatientInfo extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = PatientStore;
    }

    componentDidMount() {
        PatientActions.loadPatient(this.props.patientID);
    }

    render() {
        //Stupid fix, needs to be changed
        if (this.state.patient !== undefined)
            return (
                <div className="panel panel-default panel-body PatientInfo">
                    <h2>Protocolo para o paciente e infos (to do)</h2>





                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <strong>Start Date</strong>
                                </span>
                                <input className="form-control" readOnly value={this.state.patient.fullname}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <strong>End Date</strong>
                                </span>
                                <input className="form-control" readOnly value={this.state.patient.fullname}/>
                            </div>
                        </div>
                    </div>
                </div>








                    <p>ID: {this.state.patient.id}</p>
                    <p>Nome: {this.state.patient.fullname}</p>
                    <p>Quarto: {this.state.patient.room}</p>
                </div>
            );
        else
            return (
                <div className="panel panel-default panel-body PatientInfo">
                    <h2>Protocolo para o paciente e infos (to do)</h2>
                </div>
            );
    }
}

export default PatientInfo;
