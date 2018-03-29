import Reflux from 'reflux';

export default class extends Reflux.Store {
    constructor(){
        super();
        this.state = {flag:'OFFLINE'}; // <- set store's default state much like in React
        this.listenTo(statusUpdate, this.onStatusUpdate); // listen to the statusUpdate action
    }

    onStatusUpdate(status) {
        var newFlag = status ? 'ONLINE' : 'OFFLINE';
        this.setState({flag:newFlag});
    }
}