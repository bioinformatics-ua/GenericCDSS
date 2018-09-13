import Reflux from 'reflux';
import API from '../API.js';

const PatientClinicalVariablesActions = Reflux.createActions(['load', 'refresh', 'addCVData']);

class PatientClinicalVariablesStore extends Reflux.Store {
    constructor() {
        super();
        this.listenables = PatientClinicalVariablesActions;
        this.state = {
            data: [],
            headers: []
        };
    }

    onLoad(id){
        API.GET("patientclinicalvariables", id)
            .then(res => {
                this.setState({
                    headers: res.data["headers"],
                    data: res.data["results"]
                });
            })
    }

    onAddCVData(data){
        API.POST("patientclinicalvariables", "addVariables", data)
            .then(res => {
                this.setState({
                    headers: res.data["headers"],
                    data: res.data["results"]
                });
                this.trigger();
            });
    }
}

export {PatientClinicalVariablesStore, PatientClinicalVariablesActions};
