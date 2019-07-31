import { FETCH_ALERTS } from './alerthistory.constant';
import { getAllAlerts } from './alerthistory.api';

function updateAlertHistory(json) {
    return {
        type: FETCH_ALERTS,
        payload: json,
    }
}
export const fetchAlertsHistory = () => (dispatch) => {
    getAllAlerts()
        .then(json => {
            dispatch(updateAlertHistory(json.alerts));
        });
}
