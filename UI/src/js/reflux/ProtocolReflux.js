import Reflux from 'reflux';
import API from '../API.js';

const ProtocolActions = Reflux.createActions([
    'load',
    'loadProtocol',
    'loadAssignedProtocols',
    'loadExecutedProtocols',
    'updateSelectedProtocols',
    'cleanSelectedProtocols',
    'setSelectedPatient',
    'loadInquiryActions',
    'runProtocol',
    'createProtocol'
]);

class ProtocolStore extends Reflux.Store {
    constructor(props) {
        super(props);
        this.listenables = ProtocolActions;
        this.state = {
            protocolList: [],
            protocolListKeyValue: [],
            protocol: {
                // created_date: undefined,
                // description: undefined,
                title: ""
            },
            assignedProtocols: [],
            executedProtocols: [],
            patientID: undefined,
            loading: false,

            selectedProtocols: [],

            protocolData:[],

            protocolInquiryData:[],
            actions: undefined
        };
    }

    onLoad() {
        this.setState({loading: true});
        API.GET("protocol")
            .then(res => {
                let protocolMap = res.data["results"].map(entry => {
                    return {
                        value: entry.id,
                        label: entry.title
                    }
                });
                this.setState({
                    protocolListKeyValue: protocolMap,
                    protocolList: res.data["results"],
                    loading: false
                });
            })
    }

    onLoadProtocol(id) {
        if (id !== undefined)
            API.GET("protocol", id)
                .then(res => {
                    this.setState({protocol: res.data, protocolData: res.data.elements});
                });
        else
            this.setState({protocol: {
                               title: ""
                           },
                           protocolData: []});
    }

    onLoadInquiryActions(patientID){
        this.setState({loading: true});
        if (patientID !== undefined)
            API.GET("protocolcomponents", patientID, "patient")
                .then(res => {
                    this.setState({
                        patientID: patientID,
                        protocolInquiryData: res.data["results"],
                        loading: false
                    });
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

    onUpdateSelectedProtocols(selectedProtocol) {
        this.setState({selectedProtocol});
    }

    onSetSelectedPatient(patientID) {
        this.setState({patientID});
    }

    onCleanSelectedProtocols() {
        this.setState({
            selectedProtocol: undefined,
            patientID: undefined
        });
    }

    onRunProtocol(patientID, protocolID, inquiryData){
        this.setState({loading: true});
        API.POST("protocol", "run", {
            patientID: patientID,
            protocolID: protocolID,
            inquiryData: inquiryData
        }).then(res => {
            this.setState({
                actions: res.data["results"],
                loading: false
            });
        })
    }

    onCreateProtocol(schedules){
        //todo
    }

}

export {ProtocolStore, ProtocolActions};