import { fetchAutoSignalsList, deleteSignalFromList } from './pricealertslist.api';
import { FETCH_ALL_PRICE_ALERTS_SIGNALS } from './pricealertslist.constant';

function allSignalsFetched(json) {
    return {
        type: FETCH_ALL_PRICE_ALERTS_SIGNALS,
        payload: json.alerts,
    }
}

export const fetchAllAutoSignals = () => (dispatch) => {
    fetchAutoSignalsList()
        .then(json => { dispatch(allSignalsFetched(json)) });
}

export const deleteSignalList = (id) => (dispatch) => {
    deleteSignalFromList(id)
        .then(res => {
            dispatch(allSignalsFetched(res));
        });
}
