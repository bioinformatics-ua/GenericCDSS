import React, {Component} from 'react';
import DatePicker from 'react-date-picker';

class DisplayDateField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            minDate: this.props.minDate
        }
    }

    onChange = date => {
        this.props.onChange(this.props.keydata, date);
        this.setState({date})
    };

    render() {
        let readOnly = this.props.readOnly === undefined ? true : this.props.readOnly;

        return (
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-addon input-group-infos">
                        <strong>{this.props.label}</strong>
                    </span>
                    {
                        readOnly ?
                            <input className="form-control enabled" readOnly value={this.props.value}/>
                            :
                            <DatePicker
                                onChange={this.onChange}
                                value={this.state.date}
                                minDate={this.state.minDate}/>
                    }
                </div>
            </div>
        );
    }
}

export default DisplayDateField;







