import { combineReducers } from 'redux';
import autoSignalForm from './autosignalform/autosignalform.reducer';
import autoSignalsList from './autoSignalsList/autoSignalsList.reducer';

export default function AutoSignal() {
    return combineReducers({
        autoSignalForm,
        autoSignalsList,
    });
}
