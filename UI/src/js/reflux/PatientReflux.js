import Reflux from 'reflux';
import API from '../API.js';
import History from '../components/globalComponents/History.js';

const PatientActions = Reflux.createActions([
    'load',
    'loadPatient',
    'loadDischargedPatients',
    'addPatient'
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
                gender: undefined,
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
        API.POST("patient", null, this.state.patient)
            .then(res => {
                console.log(res.data)
                History.push('/assignprotocol/' + res.data.id);
            });
    }

}

export {PatientStore, PatientActions};