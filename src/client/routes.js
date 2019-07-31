import React from "react";
import { Router, Route } from 'react-router';
// import { HashRouter, Route } from 'react-router-dom';
import history from './history';
import AutoSignal from 'components/autosignal/autosignal.component';
import AutoSignalForm from 'components/autosignal/autosignalform/autosignalform.component';
import DashboardHome from 'components/dashboardhome/dashboardhome.component';
import AlertsHistory from 'components/alerthistory/alerthistory.component';
import FollowExperts from 'components/followexperts/followexperts.component';
import CreateExpertSignal from 'components/expertsignalform/expertsignalform.component';

function AppRouter() {
    return (
        <Router history={history}>
            <Route path="/" component={DashboardHome} exact/>
            <Route path="/alerts-history" component={AlertsHistory} exact /> 
            <Route path="/auto-signals" component={AutoSignal} />
            <Route path="/auto-signals-create" component={AutoSignalForm} />
            <Route path="/home" component={DashboardHome} exact/>
            <Route path="/follow-experts" component={FollowExperts} exact />
            <Route path="/create-expert-signal" component={CreateExpertSignal} exact />
        </Router>
    )
}

export default AppRouter;
