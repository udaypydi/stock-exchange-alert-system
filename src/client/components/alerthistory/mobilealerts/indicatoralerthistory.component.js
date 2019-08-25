import React, { useState, useEffect } from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import Moment from 'moment';
import { getAllAlerts } from '../alerthistory.api';
import './alerts.css';

function IndicatorAlertsHistory(props) {

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
                    <div className="indicator-alerts-card">
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
                    <div
                        style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 20,
                        marginLeft: 40
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", width: 100 }}>
                        <Icon style={{ fontSize: 18, color: "#fff" }} name="currency" />
                        <p
                            style={{
                            fontSize: 18,
                            color: "#fff"
                            }}
                        >
                            {alert.indicator_value}
                        </p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", width: 180 }}>
                        <Icon
                            style={{ fontSize: 18, color: "#fff" }}
                            name="clock outline"
                        />
                        <p
                            style={{
                            fontSize: 18,
                            color: "#fff"
                            }}
                        >
                            {Moment(alert.created_at).format("MMM Do YY")}
                        </p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", width: 100 }}>
                        <Icon style={{ fontSize: 18, color: "#fff" }} name="signal" />
                        <p
                            style={{
                            fontSize: 18,
                            color: "#fff"
                            }}
                        >
                            {alert.indicator}
                        </p>
                        </div>
                    </div>
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

export default IndicatorAlertsHistory;
