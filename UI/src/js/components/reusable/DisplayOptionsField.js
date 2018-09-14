import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

/**
 * Select component for input/output data
 * */
class DisplayOptionsField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selection: this.props.selection
        }
    }

    handleChange = (selection) => {
        if (selection === null)
        {
            selection = undefined;

            if(this.props.multi)
                this.props.onChange([]);
            else
                this.props.onChange({value:undefined, label:undefined});
        }
        else
            this.props.onChange(selection);
        this.setState({selection});
    };

    render() {
        return (
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-addon input-group-infos">
                        <strong>{this.props.label}</strong>
                    </span>
                    {
                        this.props.readOnly ?
                            <input className="form-control enabled" readOnly value={this.props.value}/>
                            :
                            <Select
                                placeholder={this.props.placeholder}
                                className={this.props.className}
                                name="form-field-name"
                                multi={this.props.multi}
                                value={this.state.selection}
                                onChange={this.handleChange}
                                options={this.props.options}/>
                    }
                </div>
            </div>
        );
    }

    static propTypes = {
        /**
         * Label of the grey box
         * */
        label: PropTypes.string.isRequired,
        /**
         * Selection objects
         * */
        selection: PropTypes.object,
        /**
         * Options for the selection
         * */
        options: PropTypes.array.isRequired,
        /**
         * Function comming for the parent component to handle with the selecting change
         *
         * @param Selected value (object {value, label}) or values (array of objects)
         * */
        onChange: PropTypes.func,
        /**
         * Key of the data that will receive the seletec data from the component
         * */
        placeholder: PropTypes.string,
        /**
         * Boolean to block the display to only show data (as a normal input)
         * */
        readOnly: PropTypes.bool,
        /**
         * Boolean to allow multiple selections
         * */
        multi: PropTypes.bool,
        /**
         * Class for the select component only
         * */
        className: PropTypes.string
    };
}

DisplayOptionsField.defaultProps = {
    multi: false,
    readOnly: false,
    placeholder: "",
    className: "Select",
    selection: undefined
};

export default DisplayOptionsField;







