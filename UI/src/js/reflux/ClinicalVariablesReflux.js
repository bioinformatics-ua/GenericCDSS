import Reflux from 'reflux';
import API from '../API.js';

const ClinicalVariablesActions = Reflux.createActions(['loadCVHeaders']);

class ClinicalVariablesStore extends Reflux.Store {
    constructor() {
        super();
        this.listenables = ClinicalVariablesActions;
        this.state = {
            headers: [],
            variablesDetails: []
        };
    }

    onLoadCVHeaders(){
        API.GET("clinicalvariables")
            .then(res => {
                let headersMap = res.data["results"].map(entry => {
                    return {
                        value: entry.variable,
                        label: entry.variable
                    }
                });

                this.setState({
                    headers: headersMap,
                    variablesDetails:res.data["results"]
                });
            })
    }
}

export {ClinicalVariablesStore, ClinicalVariablesActions};
