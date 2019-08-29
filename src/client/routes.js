import React, { Component } from "react";
import { connect } from 'react-redux';
// import { Router } from 'react-router';
import { Route, Router } from 'react-router';
// import { HashRouter, Route } from 'react-router-dom';
import history from './history';
import AutoSignal from 'components/autosignal/autosignal.component';
import AutoSignalForm from 'components/autosignal/autosignalform/autosignalform.component';
import DashboardHome from 'components/dashboardhome/dashboardhome.component';
import AlertsHistory from 'components/alerthistory/alerthistory.component';
import FollowExperts from 'components/followexperts/followexperts.component';
import CreateExpertSignal from 'components/expertsignalform/expertsignalform.component';
import Auth from 'components/auth/auth.component';
import SignUp from 'components/auth/signup/signup.component';
import PriceAlertsForm from 'components/pricealerts/pricealertsform/pricealertsform.component';
import PriceAlertsList from 'components/pricealerts/pricealertslist/pricealertslist.component';
import ExpertSignalsList from 'components/followexperts/expertsignallist/expertsignallist.component';
import MyProfile from 'components/myprofile/myprofile.component';
import { getUser } from 'components/home/home.api';
import { getUserState } from 'components/home/home.action';

// class AppWrapper extends Component {
//     render() {

//         if (!this.props.isLoggedIn) return <Redirect to="/sign-in" />
//         return (
//             <Route path='/home' component={DashboardHome} />
//         )
//     }
// }

class AppRouter extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getUserState());
    }

    render() {
        const { isLoggedIn } = this.props.user;

        return (
            <Router history={history}>
                <Route path="/" component={Auth} exact />
                <Route path="/alerts-history" component={AlertsHistory} exact /> 
                <Route path="/auto-signals" component={AutoSignal} />
                <Route path="/auto-signals-create" component={AutoSignalForm} />
                <Route path="/home" component={DashboardHome} exact/>
                <Route path="/follow-experts" component={FollowExperts} exact />
                <Route path="/create-expert-signal" component={CreateExpertSignal} exact />
                <Route path="/create-price-alerts" component={PriceAlertsForm} exact />
                <Route path="/sign-in" component={Auth} exact />
                <Route path="/sign-up" component={SignUp} exact />
                <Route path="/my-profile" component={MyProfile} exact />
                <Route path="/expert-signal-list" component={ExpertSignalsList} exact />
                <Route path='/price-alerts-list' component={PriceAlertsList} exact />
            </Router>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(AppRouter);
