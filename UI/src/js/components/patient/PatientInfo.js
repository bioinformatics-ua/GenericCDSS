import React from 'react';
import Reflux from 'reflux';
import {PatientStore, PatientActions} from '../../reflux/PatientReflux.js';
import DisplayField from '../reusable/DisplayField.js';

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
            return (<div className="panel panel-default panel-body PatientInfo">
                    <div className="row">
                        <div className="col-md-2">
                            <img className="profile-img" alt="Not found"
                                 src="http://www.attractivepartners.co.uk/wp-content/uploads/2017/06/profile.jpg"/>
                        </div>
                        <div className="col-md-10">
                            <div className="row">
                                <div className="col-md-6">
                                    <DisplayField label="Primeiro nome" value={this.state.patient.first_name}/>
                                </div>
                                <div className="col-md-6">
                                    <DisplayField label="Último nome" value={this.state.patient.last_name}/>
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
