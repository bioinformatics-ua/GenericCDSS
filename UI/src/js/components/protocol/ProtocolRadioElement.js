import React, {Component} from 'react';

class ProtocolRadioElement extends Component {
    constructor(props) {
        super(props);

        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    handleOptionChange(nextElement) {
        this.props.next(nextElement, this.props.componentPosition);
    }

    render() {
        //FIX THIS
        /*let options = [];
        for (var i = 0; i < this.props.options.length; i++) {
            var option = this.props.options[i];
            console.log(this.props.options);
            options.push(
                <label className="btn btn-secondary" onClick={() => this.handleOptionChange(option.option)} >
                    <input type="radio"/> {option.option}
                </label>
            );
        }*/

        return (
            <div className="panel panel-default">
                <form className="panel-body" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label for="exampleInputEmail1">{this.props.label}</label>
                        <div className="form-check">
                            <div className="btn-group btn-group-toggle btn-group-justified" data-toggle="buttons">
                                {/*options*/}

                                <label class="btn btn-secondary" onClick={() => this.handleOptionChange(this.props.options[0].next)} >
                                    <input type="radio"/> {this.props.options[0].option}
                                </label>

                                <label class="btn btn-secondary" onClick={() => this.handleOptionChange(this.props.options[1].next)} >
                                    <input type="radio"/> {this.props.options[1].option}
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default ProtocolRadioElement;
