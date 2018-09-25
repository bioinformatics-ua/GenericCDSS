import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import History from '../globalComponents/History.js';

/**
 * Component to add new patient
 * */
class AddPatientButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSuccessMessage: false
        };
    }

    admitPatient = () => {
        this.props.admitPatient();
        this.setState({
            showSuccessMessage:true
        });
    };

    patientAdmittedWithSuccess = () => {
        this.setState({showSuccessMessage:false});
    };

    render() {
        return (
            <div>
                <div className="PatientInfo-buttons-controler pull-right">
                    <button className="btn btn-success btn-100" onClick={this.addPatient}>Add</button>
                </div>
                {
                    this.state.showSuccessMessage ?
                        <SweetAlert success title="Admitted!" onConfirm={this.patientAdmittedWithSuccess}>
                            Patient admitted with success.
                        </SweetAlert>: ''
                }
            </div>
        );
    }

    static propTypes = {
    };
}

export default AddPatientButton;







