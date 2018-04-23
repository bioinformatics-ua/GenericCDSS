import Reflux from 'reflux';
import API from '../API.js';

const ProtocolActions = Reflux.createActions([
    'load',
    'loadProtocol',
    'loadAssignedProtocols',
    'loadExecutedProtocols',
    'updateSelectedProtocols',
    'cleanSelectedProtocols',
    'setSelectedPatient'
]);

class ProtocolStore extends Reflux.Store {
    constructor(props) {
        super(props);
        this.listenables = ProtocolActions;
        this.state = {
            protocolList: [],
            protocol: {
                created_date: undefined,
                description: undefined,
                title: undefined
            },
            selectedProtocols: [],
            assignedProtocols: [],
            executedProtocols: [],
            patientID: undefined,
            loading: false,
        };
    }

    onLoad() {
        this.setState({loading: true});
        API.GET("protocol")
            .then(res => {
                this.setState({
                    protocolList: res.data["results"],
                    loading: false
                });
            })
    }

    onLoadProtocol(id) {
        if (id !== undefined)
            API.GET("protocol", id)
                .then(res => {
                    this.setState({protocol: res.data});
                });
    }

    onLoadAssignedProtocols(patientID) {
        this.setState({loading: true});
        if (patientID !== undefined)
            API.GET("assignedprotocols", patientID, "patient")
                .then(res => {
                    this.setState({
                        assignedProtocols: res.data["results"],
                        loading: false
                    });
                });
        else
            this.setState({
                assignedProtocols: [],
                loading: false
            });
    }

    onLoadExecutedProtocols(patientID) {
        this.setState({loading: true});
        if (patientID !== undefined)
            API.GET("executedprotocols", patientID, "patient")
                .then(res => {
                    this.setState({
                        executedProtocols: res.data["results"],
                        loading: false
                    });
                });
        else
            this.setState({
                executedProtocols: [],
                loading: false
            });
    }

    onUpdateSelectedProtocols(selectedProtocols) {
        this.setState({selectedProtocols});
    }

    onSetSelectedPatient(patientID) {
        this.setState({patientID});
    }

    onCleanSelectedProtocols() {
        this.setState({
            selectedProtocols: [],
            patientID: undefined
        });
    }

}

export {ProtocolStore, ProtocolActions};