import React, { useState, useEffect } from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import Moment from 'moment';
import { getExpertAlerts } from '../alerthistory.api';
import './alerts.css';

function ExpertAlertHistory(props) {

    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        getExpertAlerts() 
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
                    EUR/USD
                </p>
                <div
                    style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 20,
                    marginLeft: 40,
                    flexWrap: "wrap"
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
                        {alert.buy_sell_price}
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
                        {alert.total_loss_profit}
                    </p>
                    </div>
                    <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        width: 180
                    }}
                    >
                    <Icon style={{ fontSize: 18, color: "#fff" }} name="user" />
                    <p
                        style={{
                        fontSize: 18,
                        color: "#fff"
                        }}
                    >
                        {alert.email}
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

export default ExpertAlertHistory;
