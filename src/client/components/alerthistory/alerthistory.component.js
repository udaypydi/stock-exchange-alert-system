import React, { useEffect, useState } from 'react';
import { Segment, Divider, Tab } from 'semantic-ui-react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import Header from 'commons/header/header.component';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
import { fetchAlertsHistory } from './alerthistory.action';
import ExpertAlerts from './expertalerts.component';
import PriceAlerts from './pricealertshistory.component';
import AutoAlerts from './autoalerts.component';
import styles from './alerthistory.styles';



const panes = [
    { menuItem: 'Indicator Alerts', render: () => <Tab.Pane attached={false}><AutoAlerts /> </Tab.Pane>},
    { menuItem: 'Expert Alerts', render: () => <Tab.Pane attached={false} onClick={() => { console.log('tab clicked')}}><ExpertAlerts /></Tab.Pane>},
    { menuItem: 'Price Alerts', render: () => <Tab.Pane attached={false}><PriceAlerts /></Tab.Pane>},
];


function AlerstHistory(props) {

    const [pageCount, setPageCount] = useState(0);
    const { alerts, sidebar } = props;

    useEffect(() => {
        const { dispatch } = props;
        dispatch(fetchAlertsHistory());
    }, []);

    return (
        <div>
            <Header />
            <CustomSidebar />
            <div css={styles.container} style={{ marginLeft: sidebar.sidebarOpen ? '65%' : '52%' }}>
                <Segment fluid style={{ width: sidebar.sidebarOpen ? 1000 : 1200 }}>
                    <div>
                        <div css={styles.headerContainer}>
                            <div>
                                <p>Alerts History</p>
                            </div>
                        </div>
                        <Divider />
                        <Tab menu={{ color: 'blue', secondary: true, pointing: true }} panes={panes} />
                    </div>
                </Segment>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    alerts: state.alerts,
    sidebar: state.sidebar,
});

export default connect(mapStateToProps)(AlerstHistory);
