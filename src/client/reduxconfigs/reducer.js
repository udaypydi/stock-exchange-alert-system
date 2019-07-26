import { combineReducers } from 'redux';
import autoSignal from 'components/autosignal/autosignalform/autosignalform.reducer';
import autoSignalsList from 'components/autosignal/autoSignalsList/autoSignalsList.reducer';
import dashboardHomeReducer from 'components/dashboardhome/dashboardhome.reducer';

export default combineReducers({
    autoSignal,
    autoSignalsList,
    dashboard: dashboardHomeReducer,
});
