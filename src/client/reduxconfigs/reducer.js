import { combineReducers } from 'redux';
import autoSignal from 'components/autosignal/autosignalform/autosignalform.reducer';
import autoSignalsList from 'components/autosignal/autoSignalsList/autoSignalsList.reducer';
import dashboardHomeReducer from 'components/dashboardhome/dashboardhome.reducer';
import expertSignal from 'components/expertsignalform/expertsignalform.reducer.js';
import alerts from 'components/alerthistory/alerthistory.reducer';
import sideBar from 'commons/header/header.reducer';
import priceAlert from 'components/pricealerts/pricealertsform/pricealertsform.reducer';
import mailConfig from 'commons/mailconfiguration/mailconfiguration.reducer';
import signalTiming from 'commons/alerttiming/alerttiming.reducer';
import user from 'components/auth/auth.reducer';

export default combineReducers({
    autoSignal,
    autoSignalsList,
    alerts,
    dashboard: dashboardHomeReducer,
    expertSignal,
    sidebar: sideBar,
    user,
    priceAlert,
    signalMail: mailConfig,
    signalTiming: signalTiming,
});
