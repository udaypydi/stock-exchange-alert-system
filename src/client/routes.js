import React from "react";
import { HashRouter as Router, Route } from 'react-router-dom';
import AutoSignal from 'components/autosignal/autosignal.component';
import DashboardHome from 'components/dashboardhome/dashboardhome.component';

function AppRouter() {
    return (
        <Router>
            <Route path="/" component={DashboardHome} exact/>
            <Route path="/auto-signals" component={AutoSignal} exact/>
            <Route path="/home" component={DashboardHome} exact/>
        </Router>
    )
}

export default AppRouter;
