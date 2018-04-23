import React, {Component} from 'react';
import Select from 'react-select';

class DisplayOptionsField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selection: undefined
        }
    }

    handleChange = (selection) => {
        if (selection === null)
            selection = undefined;
        this.props.onChange(this.props.keydata, selection);
        this.setState({selection});
    };

    render() {
        let readOnly = this.props.readOnly === undefined ? true: this.props.readOnly;
        let multi = this.props.multi === undefined ? false: this.props.multi;

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
                            <Select
                                placeholder={this.props.placeholder}
                                className="Select"
                                name="form-field-name"
                                multi={multi}
                                value={this.state.selection}
                                onChange={this.handleChange}
                                options={this.props.options}/>
                    }
                </div>
            </div>
        );
    }
}

export default DisplayOptionsField;







