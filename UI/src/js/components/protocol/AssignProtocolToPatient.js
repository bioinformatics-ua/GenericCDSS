import React from 'react';
import Reflux from 'reflux';
import PatientInfo from '../patient/PatientInfo.js';
import History from '../globalComponents/History.js';
import Protocols from './Protocols.js';
import SelectedProtocols from './SelectedProtocols.js';
import {StateActions} from '../../reflux/StateReflux.js';
import {ScheduleStore, ScheduleActions} from '../../reflux/ScheduleReflux.js';
import {ProtocolStore, ProtocolActions} from '../../reflux/ProtocolReflux.js';
import {AdmissionStore, AdmissionActions} from '../../reflux/AdmissionReflux.js';
import DisplayDateField from '../reusable/DisplayDateField.js';
import DisplayOptionsField from '../reusable/DisplayOptionsField.js';
import $ from 'jquery';

class AssignProtocolToPatient extends Reflux.Component {
    constructor(props) {
        super(props);
        this.stores = [ScheduleStore, ProtocolStore, AdmissionStore];
        this.state = {
            temporaryProtocol: {
                start_date: new Date(),
                end_date: new Date(),
                time: []
            }
        };

        ProtocolActions.setSelectedPatient(this.props.match.params.object);
    }

    componentDidMount() {
        ScheduleActions.load();
    }

    setDate = (label, date) => {
        let new_temporaryProtocol = this.state.temporaryProtocol;
        new_temporaryProtocol[label] = date;
        this.setState({temporaryProtocol: new_temporaryProtocol});
    };

    setTimes = (label, times) => {
        let new_temporaryProtocol = this.state.temporaryProtocol;
        new_temporaryProtocol[label] = times;
        this.setState({temporaryProtocol: new_temporaryProtocol});
    };

    addCostumizedProtocol = () => {
        let temporarySelectedProtocols = this.state.selectedProtocols;
        let protocolSchedules = this.state.temporaryProtocol.time;

        for (let index = 0; index < protocolSchedules.length; index++)
            temporarySelectedProtocols.push({
                "id": this.state.temporaryProtocol.id,
                "title": this.state.temporaryProtocol.title,
                "start_date": this.state.temporaryProtocol.start_date.toLocaleDateString(),
                "end_date": this.state.temporaryProtocol.end_date.toLocaleDateString(),
                "schedule": protocolSchedules[index].label
            })

        ProtocolActions.updateSelectedProtocols(temporarySelectedProtocols);
        StateActions.closeModal();
    };

    modalHeader = () => {
        return (
            <div className="">
                <h1>Customizar protocolo</h1>
            </div>
        );
    };

    modalContent = () => {
        return (
            <div className="panel-body">
                <DisplayDateField label={"Data de início"}
                                  keydata={"start_date"}
                                  value={this.state.temporaryProtocol.start_date}
                                  readOnly={false}
                                  onChange={this.setDate}
                />

                <DisplayDateField label={"Data de fim"}
                                  keydata={"end_date"}
                                  value={this.state.temporaryProtocol.end_date}
                                  readOnly={false}
                                  onChange={this.setDate}/>

                <DisplayOptionsField label={"Horário"}
                                     keydata={"time"}
                                     placeholder={"Selecione os diferentes horários de execução do protocolo"}
                                     value={this.state.temporaryProtocol.time}
                                     multi={true}
                                     readOnly={false}
                                     options={this.state.scheduleList}
                                     onChange={this.setTimes}/>
            </div>
        );
    };

    modalFooter = () => {
        return (
            <div className="">
                <button className="btn btn-default btn-100" onClick={this.closeModal}>
                    <i className="fa fa-ban"></i>&nbsp;Cancelar
                </button>
                <button className="btn btn-success btn-100" onClick={this.addCostumizedProtocol}>
                    <i className="fa fa-plus"></i>&nbsp;Adicionar
                </button>
            </div>
        );
    };

    openModal = (event) => {
        event.preventDefault();
        StateActions.openModal(this.modalHeader(), this.modalContent(), this.modalFooter());
        let new_temporaryProtocol = this.state.temporaryProtocol;
        new_temporaryProtocol["id"] = $(event.target).data("protocolid");
        new_temporaryProtocol["title"] = $(event.target).data("protocoltitle");
        this.setState({temporaryProtocol: new_temporaryProtocol});
    };

    closeModal = () => {
        StateActions.closeModal();
    };

    admitPatient = () => {
        AdmissionActions.admitPatient(this.state.patientID, this.state.selectedProtocols, "c12");//this.state.room);
        alert("Falta adicionar o quarto aqui num modal")
        History.push('/admittedpatients');
    };

    render() {
        return (
            <div className="Patient">
                <h2>Dar entrada do paciente</h2>
                <PatientInfo mode={"admitting"} patientID={this.state.patientID}/>

                <h2>Atribuição de protocolos</h2>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-6">
                            <Protocols selectColumn={true}
                                       rows={10}
                                       openModal={this.openModal}/>
                        </div>
                        <div className="col-md-6">
                            <SelectedProtocols rows={10}
                                               selectedProtocols={this.state.selectedProtocols}/>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="AssignProtocolToPatient-buttons-controler pull-right">
                        <button className="btn btn-success btn-100" onClick={this.admitPatient}>Concluir</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AssignProtocolToPatient;
