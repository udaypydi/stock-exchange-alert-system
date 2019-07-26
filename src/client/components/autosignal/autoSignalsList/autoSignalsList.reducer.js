import { FETCH_ALL_AUTO_SIGNALS, AUTO_SIGNAL_LIST_INITIAL_STATE } from './autoSignalsList.constant';

export default function AutoSignalsListReducer(state = AUTO_SIGNAL_LIST_INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_ALL_AUTO_SIGNALS:
            return {
                ...state,
                signalsList: action.payload,
            };

        default:
            return { ...state };
    }
}