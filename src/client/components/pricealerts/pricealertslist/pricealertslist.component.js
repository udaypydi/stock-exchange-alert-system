import React, { useEffect } from 'react';
import { Segment, Icon, Button, Responsive, Divider } from 'semantic-ui-react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Header from 'commons/header/header.component';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchAllAutoSignals, deleteSignalList } from './pricealertslist.action';
import PriceListMobile from './pricealertslist.mobile.component';
import styles from './pricealertslist.styles';

function PriceAlertsList(props) {

    const { priceAlertsList, sidebar, dispatch } = props;

    useEffect(() => {
        dispatch(fetchAllAutoSignals());
    }, []);

    function handleDeleteSignals(index) {
        const { signalsList } = priceAlertsList;
        dispatch(deleteSignalList(signalsList[index]._id));
    }

    return (
        <div style={{ marginTop: 30 }}>
            <Header />
            <Responsive minWidth={701}>
                <CustomSidebar />
                <div 
                    css={styles.container} 
                    style={{ 
                        marginLeft: sidebar.sidebarOpen ? '65%' : '52%',
                    }}
                >
                    <Segment 
                        fluid 
                        basic
                        style={{ 
                            width: sidebar.sidebarOpen ? 1000 : 1200,
                            backgroundColor: '#131633',
                            border: '1px solid #313452',
                        }}
                    >
                        <div>
                            <div css={styles.headerContainer}>
                                <div>
                                    <h2 style={{ color: '#9c9fa6' }}>Price Alerts</h2>
                                </div>
                                {
                                    priceAlertsList && priceAlertsList.signalsList.length && (
                                        <button 
                                            style={{
                                                border: "1px solid rgb(64, 81, 137)",
                                                color: "rgb(64, 81, 137)",
                                                backgroundColor: "transparent",
                                                display: "flex",
                                                padding: 10,
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => {
                                                const { history } = props;
                                                history.push('/create-price-alerts');
                                            }}
                                        >
                                            <Icon name="plus" style={{ color: "rgb(64, 81, 137)" }} />
                                            <p>Create Price Alerts</p>
                                        </button>
                                    )
                                }
                                
                            </div>
                            <Divider />
                            <Segment 
                                css={styles.signalsHeaderContainer} 
                                style={{ backgroundColor: '#222840', padding: 10 }}
                                basic
                            >
                                <p css={styles.autoSignalCell}>Signal Name</p>
                                <p css={styles.autoSignalCell}>Trade Timeframe</p>
                                <p css={styles.autoSignalCell}>Price</p>
                                <p css={styles.autoSignalCell}>Status</p>
                                <p css={styles.autoSignalCell}>Action</p>
                            </Segment>
                            {
                                priceAlertsList && priceAlertsList.signalsList.map((signal, index) => (
                                    <Segment 
                                        css={styles.signalsHeaderContainer} 
                                        style={{ borderBottom: index !== signal.length - 1 ? '1px solid #ccc' : '', padding: 0 }}
                                        basic
                                    > 
                                        <p css={styles.autoSignalCell}>{signal.name}</p>
                                        <p css={styles.autoSignalCell}>{signal.timeFrame}</p>
                                        <p css={styles.autoSignalCell}>{signal.price}</p>
                                        <div css={styles.autoSignalCell}><p css={styles.statusButton}>Pending</p></div>
                                        <div css={styles.autoSignalCell}>
                                            <Icon name="pencil" style={{ marginRight: 20 }} />
                                            <Icon 
                                                name="trash alternate outline" 
                                                color="red" 
                                                style={{ marginRight: 20 }} 
                                                onClick={() => handleDeleteSignals(index)}
                                            />
                                        </div>
                                    </Segment>
                                ))
                            }
                            {
                                priceAlertsList.signalsList.length === 0 && (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 200,
                                        textAlign: 'center'
                                    }}
                                >
                                     <Icon 
                                        name='database'
                                        style={{ 
                                            fontSize: 40,
                                            color: "rgb(64, 81, 137)",
                                        }}
                                    />
                                    <h2 style={{ marginTop: 0, color: '#9c9fa6' }}>No Data Available</h2>
                                    <button
                                        style={{
                                            border: "1px solid rgb(64, 81, 137)",
                                            color: "rgb(64, 81, 137)",
                                            backgroundColor: "transparent",
                                            display: "flex",
                                            padding: 10,
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => {
                                            const { history } = props;
                                            history.push('/create-price-alerts');
                                        }}
                                    >
                                        <Icon name="plus" style={{ color: "rgb(64, 81, 137)" }} />
                                        <p>Create Price Alerts</p>
                                    </button>
                                </div>
                            )
                            }
                        </div>
                    </Segment>
                </div>
            </Responsive>
            <Responsive maxWidth={700}>
                <PriceListMobile />
            </Responsive>
        </div>
        
    )
}

const mapStateToProps = (state) => ({
    priceAlertsList: state.priceAlertsList,
    sidebar: state.sidebar,
});

export default withRouter(connect(mapStateToProps)(PriceAlertsList));
