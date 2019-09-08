import React, { useEffect, useState } from 'react';
import { Segment, Divider, Tab, Responsive } from 'semantic-ui-react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import AlerstHistoryMobile from './alerthistory.mobile.component';
import Header from 'commons/header/header.component';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
import { fetchAlertsHistory } from './alerthistory.action';
import ExpertAlerts from './expertalerts.component';
import PriceAlerts from './pricealertshistory.component';
import AutoAlerts from './autoalerts.component';
import styles from './alerthistory.styles';



const panes = [
    { menuItem: 'Indicator Alerts', render: () => <Tab.Pane attached={false} style={{ backgroundColor: '#131633', color: '#fff' }}><AutoAlerts /> </Tab.Pane>},
    { menuItem: 'Expert Alerts', render: () => <Tab.Pane attached={false} style={{ backgroundColor: '#131633', color: '#fff' }}><ExpertAlerts /></Tab.Pane>},
    { menuItem: 'Price Alerts', render: () => <Tab.Pane attached={false} style={{ backgroundColor: '#131633', color: '#fff' }}><PriceAlerts /></Tab.Pane>},
];


function AlerstHistory(props) {

    const [pageCount, setPageCount] = useState(0);
    const { alerts, sidebar } = props;

    useEffect(() => {
        const { dispatch } = props;
        dispatch(fetchAlertsHistory());
    }, []);

    return (
        <React.Fragment>
            <Responsive minWidth={701}>
                <div>
                    <Header />
                    <CustomSidebar />
                    <div css={styles.container} style={{ marginLeft: sidebar.sidebarOpen ? '65%' : '52%' }}>
                        <Segment 
                            fluid 
                            basic
                            style={{ 
                                width: sidebar.sidebarOpen ? 1000 : 1200,
                                backgroundColor: '#131633',
                                border: '1px solid #313452',
                            }}>
                            <div>
                                <div css={styles.headerContainer}>
                                    <div>
                                        <h2 style={{ color: '#9c9fa6' }}>Alerts History</h2>
                                    </div>
                                </div>
                                <Divider />
                                <Tab menu={{ color: 'blue', secondary: true, pointing: true }} panes={panes} />
                            </div>
                        </Segment>
                    </div>
                </div>
            </Responsive>
            <Responsive maxWidth={700}>
                <div>
                    <Header />
                    {
                        sidebar.mobileSidebarOpen && (
                            <CustomSidebar />
                        )
                    }
                    <div style={{ marginTop: 100 }}>
                        <AlerstHistoryMobile />
                    </div>
                </div>
            </Responsive>
        </React.Fragment>        
    );
}

const mapStateToProps = (state) => ({
    alerts: state.alerts,
    sidebar: state.sidebar,
});

export default connect(mapStateToProps)(AlerstHistory);
