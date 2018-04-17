import Reflux from 'reflux';
import API from '../API.js';

const ClinicalVariablesActions = Reflux.createActions(['load', 'refresh', 'addCVData']);

class ClinicalVariablesStore extends Reflux.Store {
    constructor() {
        super();
        this.listenables = ClinicalVariablesActions;
        this.state = {
            data: [],
            headers: []
        };
    }

    onLoad(id){
        API.GET("clinicalvariables", id)
            .then(res => {
                this.setState({
                    headers: res.data["headers"],
                    data: res.data["results"]
                });
            })
    }

    onAddCVData(data){
        API.POST("clinicalvariables", "addVariables", data)
            .then(res => {
                this.setState({
                    headers: res.data["headers"],
                    data: res.data["results"]
                });
                this.trigger();
            });
    }
}

export {ClinicalVariablesStore, ClinicalVariablesActions};
