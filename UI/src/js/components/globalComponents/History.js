import createBrowserHistory from 'history/createBrowserHistory';
import {base_url} from '../../../../package.json';

export default createBrowserHistory({ basename: base_url });