import React from 'react';
import Reflux from 'reflux';
import {ClinicalVariablesStore, ClinicalVariablesActions} from '../../reflux/ClinicalVariablesReflux.js';
import CVRepresentationGroup from './CVRepresentationGroup.js';

import Tabs, {TabPane} from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';

class ClinicalVariables extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ClinicalVariablesStore;
        this.state = {
            patientID:this.props.patientID
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.patientID !== this.props.patientID) {
            ClinicalVariablesActions.load(this.props.patientID);
            this.setState({patientID: this.props.patientID});
        }
    }

    buildDataComponents = () => {
        let listOfComponents = [];
        let receivedList = this.state.headers;
        receivedList.sort(function (a, b) {
            return a.index_representation - b.index_representation;
        });

        for (let index = 0; index < receivedList.length; index++) {
            let content = this.state.data.filter(function (obj) {
                return obj.group === receivedList[index]["title"];
            });
            listOfComponents.push(<TabPane tab={receivedList[index]["title"]} key={(index + 1)}><br/>
                <CVRepresentationGroup headers={receivedList[index]["clinical_variables"]}
                                       content={content !== undefined ? content[0].content: undefined}
                                       title={receivedList[index]["title"]}
                                       key={index}
                                       patientID={this.state.patientID}/>
            </TabPane>);
        }

        return listOfComponents;
    };

    componentDidMount() {
        ClinicalVariablesActions.load(this.state.patientID);
    }

    render() {
        let listOfComponents = this.buildDataComponents();
        console.log(this.state)
        return (
            <div>
                <Tabs
                    defaultActiveKey="1"
                    renderTabBar={() => <ScrollableInkTabBar />}
                    renderTabContent={() => <TabContent />}
                >
                    {listOfComponents}
                </Tabs>
            </div>

        );
    }
}

export default ClinicalVariables;
