import React from 'react';
import Reflux from 'reflux';
import {PatientStore, PatientActions} from '../../reflux/PatientReflux.js';
import DisplayField from '../reusable/DisplayField.js';

class PatientInfo extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = PatientStore;
        this.state = {
            readOnly: this.props.readOnly === undefined ? false : this.props.readOnly
        };
        this.canRender = this.canRender.bind(this);
    }

    componentDidMount() {
        if(this.props.patientID !== undefined)
            PatientActions.loadPatient(this.props.patientID);
    }

    canRender(){
        if(this.state.patient !== undefined && this.props.patientID !== undefined)//Waiting for loading the selected patient
            return true;

        if(this.props.patientID === undefined) //Only ocours when insert new patient
            return true;

        return false;
    }

    render() {
        console.log(this.state);

        if (this.canRender()) //Stupid fix, needs to be changed
            return (<div className="panel panel-default panel-body PatientInfo">
                    <div className="row">
                        <div className="col-md-2">
                            {/*<img className="profile-img" alt="Not found"
                                 src="http://www.attractivepartners.co.uk/wp-content/uploads/2017/06/profile.jpg"/>*/}
                        </div>
                        <div className="col-md-10">
                            <div className="row">
                                <div className="col-md-6">
                                    <DisplayField readOnly={this.state.readOnly}
                                                  label={"Nome"} value={this.state.patient.first_name}/>
                                </div>
                                <div className="col-md-6">
                                    <DisplayField readOnly={this.state.readOnly} label={"Apelido"} value={this.state.patient.last_name}/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            );
        else
            return (<div className="panel panel-default panel-body PatientInfo"></div>);
    }
}

export default PatientInfo;
