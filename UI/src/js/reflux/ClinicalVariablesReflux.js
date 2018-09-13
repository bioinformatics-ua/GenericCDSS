import Reflux from 'reflux';
import API from '../API.js';

const ClinicalVariablesActions = Reflux.createActions(['loadCVHeaders']);

class ClinicalVariablesStore extends Reflux.Store {
    constructor() {
        super();
        this.listenables = ClinicalVariablesActions;
        this.state = {
            data: [],
            headers: []
        };
    }

    onLoadCVHeaders(){
        API.GET("clinicalvariables")
            .then(res => {
                console.log(res);
                this.setState({
                    headers: res.data["headers"],
                    data: res.data["results"]
                });
            })
    }
}

export {ClinicalVariablesStore, ClinicalVariablesActions};
