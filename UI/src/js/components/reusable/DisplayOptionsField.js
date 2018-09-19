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
        if (selection === null) {
            selection = undefined;

            if (this.props.multi)
                this.props.onChange([]);
            else
                this.props.onChange({value: undefined, label: undefined});
        }
        else
            this.props.onChange(selection);
        this.setState({selection});
    };

    render() {
        return (
            <div className={"input-group " + this.props.className}>
                <div className="input-group-prepend d-flex">
                    <span className="input-group-text input-group-addon input-group-infos">
                                        <strong>{this.props.label}</strong>
                                    </span>
                </div>

                {
                    this.props.readOnly ?
                        <input className="form-control enabled" readOnly value={this.props.value}/>
                        :
                        <Select
                            placeholder={this.props.placeholder}
                            className={"flex-fill " + this.props.selectClassName}
                            name="form-field-name"
                            multi={this.props.multi}
                            value={this.state.selection}
                            onChange={this.handleChange}
                            options={this.props.options}/>
                }

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
         * Class for the component in general
         * */
        className: PropTypes.string,
        /**
         * Class for the select component only
         * */
        selectClassName: PropTypes.string
    };
}

DisplayOptionsField.defaultProps = {
    multi: false,
    readOnly: false,
    placeholder: "",
    selectClassName: "Select",
    className: "",
    selection: undefined
};

export default DisplayOptionsField;







