import React, {Component} from 'react';

class ProtocolElement extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        this.props.next(this.props.options);
    }

    render() {
        return (
            <div class="panel panel-default">
                <form class="panel-body" >
                    <div class="form-group">
                        <label for="exampleInputEmail1">{this.props.label}</label>
                        <div className="form-check">
                            <div className="btn-group btn-group-toggle btn-group-justified" data-toggle="buttons">

                                <label class="btn btn-secondary" onClick={() => this.handleSubmit()} >
                                    <input type="radio"/> Feito
                                </label>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}


export default ProtocolElement;
