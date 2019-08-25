import React, { useState, useEffect } from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import Moment from 'moment';
import { getPriceAlerts, getAllAlerts } from '../alerthistory.api';
import './alerts.css';

function ExpertAlertHistory(props) {

    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        getAllAlerts() 
            .then(json => {
                setAlerts(json.alerts);
            });
    }, []);

    function renderAlerts() {
        return alerts.reverse().map(alert => (
            <Segment
                style={{
                display: "flex",
                flex: 1,
                width: 380,
                height: 150,
                padding: 0,
                margin: 20
                }}
                raised
            >
                <div className="expert-alerts-card">
                <p
                    style={{
                    fontSize: 24,
                    color: "#fff",
                    marginBottom: 0,
                    fontWeight: "bold"
                    }}
                >
                    {alert.currencyPair}
                </p>
                <p
                    style={{
                    fontSize: 20,
                    color: "#fff",
                    textAlign: "center",
                    fontWeight: "bold"
                    }}
                >
                    1.1114
                </p>
                </div>
            </Segment>
        ))
    }
    return (
        <div>
            {renderAlerts()}
        </div>
    )
}

export default ExpertAlertHistory;
