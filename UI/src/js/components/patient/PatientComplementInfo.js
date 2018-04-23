import React, {Component} from 'react';
import ClinicalVariables from './ClinicalVariables.js';
import AssignedProtocols from '../protocol/AssignedProtocols.js';
import ExecutedProtocols from '../protocol/ExecutedProtocols.js';

import Tabs, {TabPane} from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

class PatientComplementInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patientID: this.props.patientID
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.patientID !== this.props.patientID)
            this.setState({patientID:this.props.patientID});
    }

    render() {
        return (
            <div className="panel panel-default panel-body CVRepresentationGroup">
                <Tabs
                    defaultActiveKey="1"
                    renderTabBar={() => <ScrollableInkTabBar />}
                    renderTabContent={() => <TabContent />}
                >
                    <TabPane tab='Dados Clínicos' key="1">
                        <ClinicalVariables patientID={this.state.patientID}/>
                    </TabPane>

                    <TabPane tab='Tratamentos' key="2">
                        <ExecutedProtocols patientID={this.state.patientID}/>
                    </TabPane>

                    <TabPane tab='Protocolos' key="3">
                        <AssignedProtocols patientID={this.state.patientID}/>
                    </TabPane>
                    {/*to do*/}
                    {/*<TabPane tab='Histórico' key="4">Histórico de todas as ações (history backend)</TabPane>*/}
                </Tabs>
            </div>
        );
    }
}

export default PatientComplementInfo;
