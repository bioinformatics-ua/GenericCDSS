import Reflux from 'reflux';
import API from '../API.js';

const PatientActions = Reflux.createActions([
    'load',
    'loadPatient',
    'loadDischargedPatients',
    'addPatient',
    'admitPatient',
    'dischargePatient'
]);

class PatientStore extends Reflux.Store {
    constructor(props) {
        super(props);
        this.listenables = PatientActions;
        this.state = {
            patient: this.getPatientInitialState(),
            patientList: [],
            patientListKeyValue: [],
            loading: false,
        };
    }

    getPatientInitialState = () => {
        return {
                first_name: '',
                last_name: '',
                gender: '',
                birthdate: '',
                phone: '',
                email: '',
                status: undefined,
                fullgender: ''
            }
    };

    onLoad() {
        this.setState({loading: true});
        API.GET("patient")
            .then(res => {
                this.setState({
                    patientList: res.data["results"],
                    loading: false
                });
            })
    }

    onLoadDischargedPatients() {
        this.setState({loading: true});
        API.GET("patient", "listDischarged")
            .then(res => {
                let patientMap = res.data["results"].map(entry => {
                    return {
                        value: entry.id,
                        label: entry.fullname
                    }
                });
                this.setState({
                    //patientList: res.data["results"],
                    patientListKeyValue: patientMap,
                    loading: false
                });
            })
    }

    onLoadPatient(id) {
        if (id !== undefined)
            API.GET("patient", id)
                .then(res => {
                    this.setState({patient: res.data});
                });
        else
            this.setState({patient: this.getPatientInitialState()});
    }

    onAddPatient() {
        API.POST("patient", null, this.state.patient);
    }

    onDischargePatient(id) {
        API.POST("patient", "discharge", {id:id});
    }

    onAdmitPatient() {
        console.log("TO DO: Admit Patient Reflux");
        //API.POST("patient", null, this.state.patient);
    }

}

export {PatientStore, PatientActions};