import React, {Component} from 'react';
import Reflux from 'reflux';
import {ProtocolStore, ProtocolActions} from '../../reflux/ProtocolReflux.js';
import Flowchart from 'react-simple-flowchart';

class ShowProtocol extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ProtocolStore;
        this.state = {
            protocolID: this.props.match.params.object
        };
    }

    componentDidMount() {
        ProtocolActions.loadProtocol(this.state.protocolID);
    }

    render() {
        return (
            <div className="ShowProtocol">
                <h2>Protocolo: {this.state.protocol.title}</h2>
                Mostrar o protocolo (todos os elementos)
            </div>
        );
    }
}

export default ShowProtocol;

/*

 export default class ShowProtocol extends Component {

 constructor(props) {
 super(props);
 const code =
 `st=>start: Begin
 e=>end: End
 op1=>operation: Operation 1|department1
 op2=>operation: Operation 2|department2
 sub=>subroutine: Go To Google|external:>http://www.google.com
 cond=>condition: Google?
 st(right)->op1(right)->op2(right)->cond(yes)->sub(bottom)
 cond(no)->e`;

 const opt = {
 x: 0,
 y: 0,
 'line-width': 3,
 'line-length': 50,
 'text-margin': 10,
 'font-size': 14,
 'font-color': 'black',
 'line-color': 'black',
 'element-color': 'black',
 fill: 'white',
 'yes-text': 'yes',
 'no-text': 'no',
 'arrow-end': 'block',
 scale: 1,
 symbols: {
 start: {
 'font-color': 'red',
 'element-color': 'green',
 'font-weight': 'bold',
 },
 end: {
 'font-color': 'red',
 'element-color': 'green',
 'font-weight': 'bold',
 },
 },
 flowstate: {
 department1: {fill: 'pink'},
 department2: {fill: 'yellow'},
 external: {fill: 'green'},
 },
 };

 this.state = {
 code,
 opt,
 elementText: 'none',
 }
 }

 handleCodeChange(e) {
 this.setState({
 code: e.target.value,
 });

 }

 handleOptChange(e) {
 this.setState({
 opt: JSON.parse(e.target.value),
 });

 }

 render() {
 const {code, opt, elementText} = this.state;
 return (
 <div>
 <p>Edit flowchart in real time!</p>
 <textarea
 cols="100"
 rows="10"
 value={code}
 onChange={(e) => this.handleCodeChange(e)}
 />
 <br /><br />
 <p>Flowchart options</p>
 <textarea cols="100"
 rows="10"
 value={JSON.stringify(opt)}
 onChange={(e) => this.handleOptChange(e)}
 />
 <br /><br />
 <p>Result</p>
 <p>Last Clicked Node: <strong>{elementText}</strong></p>
 <Flowchart
 chartCode={code}
 options={opt}
 onClick={elementText => this.setState({elementText})}
 />
 </div>
 );
 }
 }
 */