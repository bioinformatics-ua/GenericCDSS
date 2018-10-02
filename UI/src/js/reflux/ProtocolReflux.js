import Reflux from 'reflux';
import API from '../API.js';
import History from '../components/globalComponents/History.js';

const ProtocolActions = Reflux.createActions([
    'load',
    'loadProtocol',
    'loadAssignedProtocols',
    'loadExecutedProtocols',
    'updateSelectedProtocols',
    'setSelectedPatient',
    'loadInquiryActions',
    'runProtocol',
    'createProtocol',
    'loadProtocolInquiryActions',
    'runProtocolTest',
    'removeProtocol'
]);

class ProtocolStore extends Reflux.Store {
    constructor(props) {
        super(props);
        this.listenables = ProtocolActions;
        this.state = {
            protocolList: [],
            protocolListKeyValue: [],
            protocol: {
                description: "",
                title: ""
            },
            assignedProtocols: [],
            executedProtocols: [],
            patientID: undefined,
            loading: false,

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
                    let scheduleMap = res.data["schedules"].map(entry => {
                        return {
                            value: entry.title,
                            label: entry.title
                    }
                    });
                    let protocol = res.data;
                    protocol["schedules"] = scheduleMap;
                    this.setState({
                        schedules:scheduleMap,
                        protocol: protocol,
                        protocolData: res.data.elements
                    });
                });
        else
            this.setState({
                protocol: {
                    title: "",
                    description: "",
                },
                schedules:undefined,
                protocolData: []
            });
    }

    onLoadInquiryActions(patientID){
        if (patientID !== undefined){
            this.setState({loading: true});
            API.GET("protocolcomponents", patientID, "patient")
                .then(res => {
                    this.setState({
                        patientID: patientID,
                        protocolInquiryData: res.data["results"],
                        loading: false
                    });
                });
        }
    }

    onLoadProtocolInquiryActions(protocolID){
        if (protocolID !== undefined) {
            this.setState({loading: true});
            API.GET("protocolcomponents", protocolID, "protocol")
                .then(res => {
                    this.setState({
                        protocolInquiryData: res.data["results"],
                        loading: false
                    });
                });
        }
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

    onRunProtocolTest(protocolID, inquiryData){
        this.setState({loading: true});
        API.POST("protocol", "runtest", {
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
        this.setState({loading: true});
        API.POST("protocol", "createProtocol", {
            protocolElements: this.state.protocolData,
            title: this.state.protocol.title,
            description: this.state.protocol.description,
            schedules: schedules
        }).then(res => {
            this.setState({
                protocol: res.data["results"], protocolData: res.data["results"].elements,
                loading: false
            });
            History.push('/show/protocol/' + res.data["results"]["id"]);
            window.location.reload();
        })
    }

    onRemoveProtocol(protocolID){
        if (protocolID !== undefined) {
            this.setState({loading: true});
            API.POST("protocol", "remove",{
                    protocolID: protocolID
                }).then(res => {
                    this.setState({
                        loading: false
                    });
                });
        }
    }

}

export {ProtocolStore, ProtocolActions};