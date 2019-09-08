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


function AlerstHistory(props) {

    const [pageCount, setPageCount] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const { alerts, sidebar } = props;

    useEffect(() => {
        const { dispatch } = props;
        dispatch(fetchAlertsHistory());
    }, []);

    const renderAlertsHistoryTabs = () => (
        <div style={{ display: 'flex' }}>
            <div 
                style={{ 
                    background: activeIndex === 0 ? 'transparent' : '#292f42', 
                    color: '#b1b1b5', 
                    padding: 10, 
                    cursor: 'pointer',
                    border: activeIndex === 0 ? '1px solid #b1b1b5' : '',
                    borderBottomWidth: 0,
                }}
                onClick={() => {
                    setActiveIndex(0);
                }}
            >
                <p>Indicator Alerts</p>
            </div>
            <div 
                style={{ 
                    background: activeIndex === 1 ? 'transparent' : '#292f42',  
                    color: '#b1b1b5', 
                    padding: 10, 
                    cursor: 'pointer',
                    border: activeIndex === 1 ? '1px solid #b1b1b5' : '',
                    borderBottomWidth: 0,
                }}
                onClick={() => {
                    setActiveIndex(1);
                }}
            >
                <p>Expert Alerts</p>
            </div>
            <div 
                style={{ 
                    background: activeIndex === 2 ? 'transparent' : '#292f42', 
                    color: '#b1b1b5', 
                    padding: 10, 
                    cursor: 'pointer',
                    border: activeIndex === 2 ? '1px solid #b1b1b5' : '',
                    borderBottomWidth: 0,
                }}
                onClick={() => {
                    setActiveIndex(2);
                }}
            >
                <p>Price Alerts</p>
            </div>
        </div>
    );

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
                                {renderAlertsHistoryTabs()}
                                <div style={{ border: '1px solid #b1b1b5' }}>
                                    {activeIndex === 0 && <AutoAlerts />}
                                    {activeIndex === 1 && <ExpertAlerts />}
                                    {activeIndex === 2 && <PriceAlerts />}
                                </div>
                                
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
