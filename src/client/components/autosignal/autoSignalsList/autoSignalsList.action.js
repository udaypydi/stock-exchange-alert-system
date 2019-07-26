import { fetchAutoSignalsList } from './autoSignalsList.api';
import { FETCH_ALL_AUTO_SIGNALS } from './autoSignalsList.constant';

function allSignalsFetched(json) {
    return {
        type: FETCH_ALL_AUTO_SIGNALS,
        payload: json.alerts_signals,
    }
}

export const fetchAllAutoSignals = () => (dispatch) => {
    fetchAutoSignalsList()
        .then(json => { dispatch(allSignalsFetched(json)) });
}
