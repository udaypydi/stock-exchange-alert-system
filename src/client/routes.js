import React, { Component } from "react";
import { connect } from 'react-redux';
// import { Router } from 'react-router';
import { Route, Router } from 'react-router';
import io from 'socket.io-client';
import toastr from 'toastr';

const socket = io('http://localhost:3000', {transports: ['websocket'], upgrade: false});

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
import TermsAndConditions from 'components/termsandconditions/termsandconditions.component';
import PrivacyPolicy from 'components/privacypolicy/privacypolicy.component';
// class AppWrapper extends Component {
//     render() {

//         if (!this.props.isLoggedIn) return <Redirect to="/sign-in" />
//         return (
//             <Route path='/home' component={DashboardHome} />
//         )
//     }
// }

  
let socketConnected = false;

class AppRouter extends Component {
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getUserState());
    }

    render() {
        const { isLoggedIn } = this.props.user;
        if (isLoggedIn) {
            socket.emit('join', {email: this.props.user.email });
            socket.on("new_msg", function(data) {

                toastr.options = {
                    "closeButton": true,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": false,
                    "positionClass": "toast-top-right",
                    "preventDuplicates": true,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };
                if (data.type === 'success') {
                    toastr.success(data.content, data.title, {timeOut: 3000});
                } else { 
                    toastr.error(data.content, data.title, {timeOut: 3000});                   
                }
                console.log(data);
            });
        }

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
                <Route path='/terms-and-conditions' component={TermsAndConditions} exact />
                <Route path='/privacy-policy' component={PrivacyPolicy} exact />
            </Router>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(AppRouter);
