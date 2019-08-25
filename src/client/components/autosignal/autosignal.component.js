import React, { useState, useEffect } from 'react';
import { Segment, Button, Divider, Responsive } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleLoadingStatus } from './autosignalform/autosignalform.action';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Header from 'commons/header/header.component';
import AutoSignalForm from './autosignalform/autosignalform.component';
import AutoSignalsList from './autoSignalsList/autoSignalsList.component';
import AutoSignalMobile from './autoSignalsList/autoSignalList.mobile.component';
import styles from './autosignal.styles';

function AutoSignal(props) {
    const [isAutoSignalFormVisible, setisAutoSignalFormVisible] = useState(false);
    const { autoSignal, sidebar } = props;


    function showAutoSignalConfigurationForm() {
        const { history } = props;
        history.push('/auto-signals-create');
    }

    return (
        <div style={{ backgroundColor: '#f0f2f5'}}>
            <Header />
            <Responsive minWidth={701}>
                <CustomSidebar />
                <div css={styles.container} style={{ marginLeft: sidebar.sidebarOpen ? '65%' : '52%' }}>
                    <Segment 
                        fluid 
                        style={{ width: sidebar.sidebarOpen ? 1000 : 1200 }}
                    >
                        <div>
                            <div css={styles.headerContainer}>
                                <div>
                                    <p>Indicator Signals</p>
                                </div>
                                <Button 
                                    basic 
                                    color="blue" 
                                    content='Create Indicator Signals' 
                                    icon={'add'}
                                    labelPosition='left' 
                                    onClick={showAutoSignalConfigurationForm}
                                />
                            </div>
                            <Divider />
                            <AutoSignalsList />
                        </div>
                    </Segment>
                </div>
            </Responsive>
            <Responsive maxWidth={700}>
                {
                    sidebar.mobileSidebarOpen && (
                        <CustomSidebar />
                    )
                }
                <div>
                    <AutoSignalMobile />
                </div>
            </Responsive>
        </div>
    );
}

const mapStateToProps = (state) => ({
    autoSignal: state.autoSignal,
    sidebar: state.sidebar,
});

export default withRouter(connect(mapStateToProps)(AutoSignal));
