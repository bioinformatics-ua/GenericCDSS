import Reflux from 'reflux';
import API from '../API.js';

const AdmissionActions = Reflux.createActions([
    'load',
    'admitPatient',
    'dischargePatient'
]);

class AdmissionStore extends Reflux.Store {
    constructor(props) {
        super(props);
        this.listenables = AdmissionActions;
        this.state = {
            patientList: [],
            loading: false,
        }
    }

    onLoad() {
        this.setState({loading: true});
        API.GET("admission")
            .then(res => {
                this.setState({
                    patientList: res.data["results"],
                    loading: false
                });
            })
    }

    onDischargePatient(id) {
        API.POST("admission", "discharge", {patientID: id});
    }

    onAdmitPatient(patientID, seletedProtocols) {
        this.setState({loading: true});
        API.POST("admission", "new", {
            patientID: patientID,
            seletedProtocols: seletedProtocols
        }).then(res => {
            this.setState({
                patientList: res.data["results"],
                loading: false
            });
        })
    }

}

export {AdmissionStore, AdmissionActions};