import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import History from '../globalComponents/History.js';

/**
 * Component to admit patient
 * */
class AdmitPatientButton extends Component {
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
        History.push('/admittedpatients');
    };

    render() {
        return (
            <div>
                <div className="AssignProtocolToPatient-buttons-controler pull-right">
                    <button className="btn btn-success btn-100" onClick={this.admitPatient}>Admit</button>
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
        /**
         * Functions to admit patient in the parent component
         * */
        admitPatient: PropTypes.func.isRequired
    };
}

export default AdmitPatientButton;







