import Reflux from 'reflux';
import API from '../API.js';

const ClinicalVariablesActions = Reflux.createActions(['load']);

class ClinicalVariablesStore extends Reflux.Store {
    constructor() {
        super();
        this.listenables = ClinicalVariablesActions;
        this.state = {
            data: [],
            summary: []
        };
    }

    onLoad(id){
        API.GET("clinicalvariables", id)
            .then(res => {
                this.setState({
                    data: res.data["results"]["all_data"],
                    summary: res.data["results"]["summary"]
                });
            })
    }
}

export {ClinicalVariablesStore, ClinicalVariablesActions};
