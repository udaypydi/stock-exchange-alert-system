import { combineReducers } from 'redux';
import autoSignal from 'components/autosignal/autosignalform/autosignalform.reducer';
import autoSignalsList from 'components/autosignal/autoSignalsList/autoSignalsList.reducer';
import dashboardHomeReducer from 'components/dashboardhome/dashboardhome.reducer';
import expertSignal from 'components/expertsignalform/expertsignalform.reducer.js';
import alerts from 'components/alerthistory/alerthistory.reducer';

export default combineReducers({
    autoSignal,
    autoSignalsList,
    alerts,
    dashboard: dashboardHomeReducer,
    expertSignal,
});
