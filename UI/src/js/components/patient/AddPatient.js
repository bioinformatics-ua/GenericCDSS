import React from 'react';
import Reflux from 'reflux';
import {PatientStore, PatientActions} from '../../reflux/PatientReflux.js';
import PatientInfo from './PatientInfo.js';
import DisplayField from '../reusable/DisplayField.js';

class AddPatient extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = PatientStore;
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div className="AddPatient">
                <h2>Introduzir paciente</h2>



                <PatientInfo readOnly={false}/>


                <form onSubmit={this.handleSubmit}>

                    <DisplayField readOnly={false} label={"Nome"} value={this.state.value} onChange={this.handleChange}/>

                    <input type="submit" value="Submit"/>
                </form>

            </div>
        );
    }
}

export default AddPatient;