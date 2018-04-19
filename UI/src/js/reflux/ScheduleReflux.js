import Reflux from 'reflux';
import API from '../API.js';

const ScheduleActions = Reflux.createActions([
    'load'
]);

class ScheduleStore extends Reflux.Store {
    constructor(props) {
        super(props);
        this.listenables = ScheduleActions;
        this.state = {
            scheduleList: [],
            loading: false
        };
    }

    onLoad() {
        this.setState({loading: true});
        API.GET("schedule")
            .then(res => {
                let scheduleMap = res.data["results"].map(entry => {
                    return {
                        value: entry.id,
                        label: entry.hoursMinutes
                    }
                });

                this.setState({
                    scheduleList: scheduleMap,
                    loading: false
                });
            })
    }

}

export {ScheduleStore, ScheduleActions};
