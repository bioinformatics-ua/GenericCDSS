import React from 'react';
import Reflux from 'reflux';
import PatientInfo from '../patient/PatientInfo.js';
import History from '../globalComponents/History.js';
import {StateActions} from '../../reflux/StateReflux.js';
import {ScheduleStore, ScheduleActions} from '../../reflux/ScheduleReflux.js';
import {ProtocolStore, ProtocolActions} from '../../reflux/ProtocolReflux.js';
import {AdmissionStore, AdmissionActions} from '../../reflux/AdmissionReflux.js';
import DisplayField from '../reusable/DisplayField.js';
import ProtocolCostumization from './ProtocolCostumization.js';
import $ from 'jquery';



class AssignProtocolToPatient extends Reflux.Component {
    constructor(props) {
        super(props);
        this.stores = [ScheduleStore, ProtocolStore, AdmissionStore];
        this.state = {
            room: undefined,
            selectedProtocol: []
        };

        ProtocolActions.setSelectedPatient(this.props.match.params.object);
    }

    componentDidMount() {
        ScheduleActions.load();
    }

    modalHeader = () => {
        return (
            <div className="">
                <h1>Dados sobre o internamento</h1>
            </div>
        );
    };

    handleChange = (event) => {
        event.preventDefault();
        let key = $(event.target).data("keydata");
        let new_state = this.state;
        new_state[key] = event.target.value;
        this.setState({new_state});
    };

    modalContent = () => {
        return (
            <div className="card-body">
                <DisplayField onChange={this.handleChange} label={"Quarto"}
                              keydata={"room"} value={this.state.room}/>
            </div>
        );
    };

    modalFooter = () => {
        return (
            <div className="">
                <button className="btn btn-default btn-100" onClick={this.closeModal}>
                    <i className="fa fa-ban"></i>&nbsp;Cancel
                </button>
                <button className="btn btn-success btn-100" onClick={this.admitPatient}>
                    <i className="fa fa-plus"></i>&nbsp;Add
                </button>
            </div>
        );
    };

    openModal = (event) => {
        event.preventDefault();
        StateActions.openModal(this.modalHeader(), this.modalContent(), this.modalFooter());
    };

    closeModal = () => {
        StateActions.closeModal();
    };

    admitPatient = () => {
        let selectedProtocols = [{"id":this.state.selectedProtocol.selectedProtocol["value"]}]; //Provisorio
        AdmissionActions.admitPatient(this.state.patientID, selectedProtocols, this.state.room);
        History.push('/admittedpatients');
        StateActions.closeModal();
    };

    selectHandleChange = (selectedProtocol) => {
        if (selectedProtocol === null)
            selectedProtocol = undefined;
        this.setState({selectedProtocol});
    };

    render() {
        return (
            <div className="Patient">
                <h2>Admitting patient</h2>
                <PatientInfo mode={"admitting"} patientID={this.state.patientID}/>

                <h2>Protocol assignment</h2>
                <ProtocolCostumization setProtocol={this.selectHandleChange}/>

                <hr/>

                <div>

                    <div className="AssignProtocolToPatient-buttons-controler pull-right">
                        <button className="btn btn-success btn-100" onClick={this.openModal}>Admit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AssignProtocolToPatient;




// import React from 'react';
// import Reflux from 'reflux';
// import PatientInfo from '../patient/PatientInfo.js';
// import History from '../globalComponents/History.js';
// import Protocols from './Protocols.js';
// import SelectedProtocols from './SelectedProtocols.js';
// import {StateActions} from '../../reflux/StateReflux.js';
// import {ScheduleStore, ScheduleActions} from '../../reflux/ScheduleReflux.js';
// import {ProtocolStore, ProtocolActions} from '../../reflux/ProtocolReflux.js';
// import {AdmissionStore, AdmissionActions} from '../../reflux/AdmissionReflux.js';
// import DisplayDateField from '../reusable/DisplayDateField.js';
// import DisplayOptionsField from '../reusable/DisplayOptionsField.js';
// import $ from 'jquery';
//
// class AssignProtocolToPatient extends Reflux.Component {
//     constructor(props) {
//         super(props);
//         this.stores = [ScheduleStore, ProtocolStore, AdmissionStore];
//         this.state = {
//             temporaryProtocol:{
//                 start_date: new Date(),
//                 end_date: new Date(),
//                 time:[]
//             }
//         };
//
//         ProtocolActions.setSelectedPatient(this.props.match.params.object);
//     }
//
//     componentDidMount(){
//         ScheduleActions.load();
//     }
//
//     setDate = (label, date) => {
//         let new_temporaryProtocol = this.state.temporaryProtocol;
//         new_temporaryProtocol[label] = date;
//         this.setState({temporaryProtocol: new_temporaryProtocol});
//     };
//
//     setTimes = (label, times) => {
//         let new_temporaryProtocol = this.state.temporaryProtocol;
//         new_temporaryProtocol[label] = times;
//         this.setState({temporaryProtocol: new_temporaryProtocol});
//     };
//
//     addCostumizedProtocol = () => {
//         let temporarySelectedProtocols = this.state.selectedProtocols;
//         let protocolSchedules = this.state.temporaryProtocol.time;
//
//         for(let index = 0; index < protocolSchedules.length; index ++)
//             temporarySelectedProtocols.push({
//                 "id" : this.state.temporaryProtocol.id,
//                 "title" : this.state.temporaryProtocol.title,
//                 "start_date": this.state.temporaryProtocol.start_date.toLocaleDateString(),
//                 "end_date": this.state.temporaryProtocol.end_date.toLocaleDateString(),
//                 "schedule": protocolSchedules[index].label
//             })
//
//         ProtocolActions.updateSelectedProtocols(temporarySelectedProtocols);
//         StateActions.closeModal();
//     };
//
//     modalHeader = () => {
//         return (
//             <div className="">
//                 <h1>Customizar protocolo</h1>
//             </div>
//         );
//     };
//
//     modalContent = () => {
//         return (
//             <div className="panel-body">
//                 <DisplayDateField label={"Data de início"}
//                                   keydata={"start_date"}
//                                   value={this.state.temporaryProtocol.start_date}
//                                   readOnly={false}
//                                   onChange={this.setDate}
//                                   />
//
//                 <DisplayDateField label={"Data de fim"}
//                                   keydata={"end_date"}
//                                   value={this.state.temporaryProtocol.end_date}
//                                   readOnly={false}
//                                   onChange={this.setDate} />
//
//                 <DisplayOptionsField label={"Horário"}
//                                      keydata={"time"}
//                                      value={this.state.temporaryProtocol.time}
//                                      multi={true}
//                                      readOnly={false}
//                                      options={this.state.scheduleList}
//                                      onChange={this.setTimes}/>
//             </div>
//         );
//     };
//
//     modalFooter = () => {
//         return (
//             <div className="">
//                 <button className="btn btn-default btn-100" onClick={this.closeModal}>
//                     <i className="fa fa-ban"></i>&nbsp;Cancelar
//                 </button>
//                 <button className="btn btn-success btn-100" onClick={this.addCostumizedProtocol}>
//                     <i className="fa fa-plus"></i>&nbsp;Adicionar
//                 </button>
//             </div>
//         );
//     };
//
//     openModal = (event) => {
//         event.preventDefault();
//         StateActions.openModal(this.modalHeader(), this.modalContent(), this.modalFooter());
//         let new_temporaryProtocol = this.state.temporaryProtocol;
//         new_temporaryProtocol["id"] = $(event.target).data("protocolid");
//         new_temporaryProtocol["title"] = $(event.target).data("protocoltitle");
//         this.setState({temporaryProtocol: new_temporaryProtocol});
//     };
//
//     closeModal = () => {
//         StateActions.closeModal();
//     };
//
//     admitPatient = () => {
//         AdmissionActions.admitPatient(this.state.patientID, this.state.selectedProtocols);
//         History.push('/admittedpatients');
//     };
//
//     render() {
//         let patientID = this.props.match.params.object;
//         return (
//             <div className="Patient">
//                 <h2>Patient admission</h2>
//                 <PatientInfo mode={"admitting"} patientID={patientID}/>
//
//                 <h2>Protocols assigment</h2>
//                 <div>
//                     <div className="row">
//                         <div className="col-md-6">
//                             <Protocols selectColumn={true}
//                                        rows={7}
//                                        openModal={this.openModal}/>
//                         </div>
//                         <div className="col-md-6">
//                             <SelectedProtocols rows={7}
//                                                selectedProtocols = {this.state.selectedProtocols}/>
//                         </div>
//                     </div>
//                 </div>
//
//                 <div>
//                     <div className="AssignProtocolToPatient-buttons-controler pull-right">
//                         <button className="btn btn-success btn-100" onClick={this.admitPatient}>Done</button>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }
//
// export default AssignProtocolToPatient;














