import React, {Component} from 'react';
import ReactTable from 'react-table';
import {StateActions} from '../../reflux/StateReflux.js';
import DisplayField from '../reusable/DisplayField.js';
import $ from 'jquery';

class CVRepresentationGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            header: [],
            loading: true,
            visible: false,
            insertionData: {}
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.content !== undefined && this.state.data !== undefined)
            if (this.props.content.length !== this.state.data.length)
                this.setState({data: this.props.content});
    }


    componentDidMount() {
        this.buildTableHeader();
        this.buildDisplayComponents();
    }

    buildTableHeader = () => {
        let listOfComponents = [];
        let receivedList = this.props.headers;
        receivedList.sort(function (a, b) {
            return a.index_representation - b.index_representation;
        });

        listOfComponents.push({
            Header: () => <h5 className="h5-table">Data</h5>,
            id: "measure_date",
            accessor: obj => obj["measure_date"],
            Cell: props => <span>{props.value}</span>
        });

        for (let key in receivedList) {
            listOfComponents.push({
                Header: () => <h5 className="h5-table">{receivedList[key].variable}</h5>,
                id: receivedList[key].variable,
                accessor: obj => obj[receivedList[key].variable],
                Cell: props => <span>{props.value}</span>
            });
        }
        this.setState({header: listOfComponents});
    };

    buildDisplayComponents = () => {
        if (this.props.content !== undefined)
            this.setState({
                data: this.props.content,
                loading: false
            });
        else
            this.setState({
                loading: false
            });
    };

    addCVData = () => {
        console.log("show result")
        // let insertionData = this.state.insertionData;
        // insertionData["group"] = this.props.title;
        // insertionData["patient"] = this.props.patientID;
        //
        // ClinicalVariablesActions.addCVData(insertionData);
        // StateActions.closeModal();
        // this.setState({insertionData: {}});
    };


    handleChange = (event) => {
        event.preventDefault();
        let key = $(event.target).data("keydata");
        let new_insertionData = this.state.insertionData;
        new_insertionData[key] = event.target.value;
        this.setState({insertionData: new_insertionData});
    };

    buildInsertionFields = () => {
        let items = [];
        let headers = this.state.header;
        for (let index in headers)
            if (headers[index].id !== 'measure_date')//Because measure date will be the time that this enter in the system (if doctor wants to insert manually, deal with that here
                items.push(<DisplayField onChange={this.handleChange}
                                         label={headers[index].id}
                                         keydata={headers[index].id}
                                         value={this.state.insertionData[headers[index].id]}
                                         key={index}/>);

        return items;
    };

    modalHeader = () => {
        return (
            <div className="">
                {/*<h1>Insert measurements in {this.props.title} group</h1>*/}
                <h1>Execute Hypoglycemia protocol</h1>
            </div>
        );
    };

    modalContent = () => {
        let components = this.buildInsertionFields();
        return (
            <div className="panel-body">
                {components}

                {/*<div class="panel panel-info">*/}
                  {/*<div class="panel-heading">Actions recommended</div>*/}
                  {/*<div class="panel-body">1 - Given half of a 30% IV glucose ampoule and glucose serum 5%</div>*/}
                {/*</div>*/}
            </div>
        );
    };

    modalFooter = () => {
        return (
            <div className="">
                <button className="btn btn-default btn-100" onClick={this.closeModal}>
                    <i className="fa fa-ban"></i>&nbsp;Cancel
                </button>
                {/*/!* */}
                <button className="btn btn-success btn-100" onClick={this.addCVData}>
                    <i className="fa fa-plus"></i>&nbsp;Add
                </button>
                {/**!/*/}
            </div>
        );
    };

    openModal = () => {
        StateActions.openModal(this.modalHeader(), this.modalContent(), this.modalFooter());
    };

    closeModal = () => {
        StateActions.closeModal();
        this.setState({insertionData: []});
    };

    render() {
        return (
            <div className="panel-content">
                <ReactTable
                    data={this.state.data}
                    columns={this.state.header}
                    defaultPageSize={4}
                    filterable
                    loading={this.state.loading}
                    defaultSorted={[{
                        id: 'measure_date',
                        desc: true,
                    }]}/>

                 {/*Button to add variables*/}
                {/*<div className="CVRepresentationGroup-buttons-controler pull-right">*/}
                    {/*<button className="btn btn-success btn-100" onClick={this.openModal}>*/}
                        {/*<i className="fa fa-plus"></i>&nbsp;Add measurements*/}
                    {/*</button>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default CVRepresentationGroup;
