import Reflux from 'reflux';
import API from '../API.js';

const PatientActions = Reflux.createActions(['load', 'loadPatient']);

class PatientStore extends Reflux.Store {
    constructor() {
        super();
        this.listenables = PatientActions;
        this.state = {
            patient: undefined,
            patientList: []
        };
    }

    onLoad(){
        API.GET("patient")
            .then(res => {
                this.setState({patientList: res.data["results"]});
            })
    }

    onLoadPatient(id){
        API.GET("patient", id)
            .then(res => {
                this.setState({patient: res.data});
            })
    }

}

export {PatientStore, PatientActions};