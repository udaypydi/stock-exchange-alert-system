import React, { useState, useEffect } from 'react';
import { Segment, Button, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleLoadingStatus } from './autosignalform/autosignalform.action';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Header from 'commons/header/header.component';
import AutoSignalForm from './autosignalform/autosignalform.component';
import AutoSignalsList from './autoSignalsList/autoSignalsList.component';
import styles from './autosignal.styles';

function AutoSignal(props) {
    const [isAutoSignalFormVisible, setisAutoSignalFormVisible] = useState(false);
    const { autoSignal } = props;


    function showAutoSignalConfigurationForm() {
        const { history } = props;
        history.push('/auto-signals-create');
    }

    return (
        <div>
            <Header />
            <CustomSidebar />
            <div css={styles.container}>
                <Segment fluid style={{ width: 1000 }}>
                    <div>
                        <div css={styles.headerContainer}>
                            <div>
                                <p>Auto Signals</p>
                            </div>
                            <Button 
                                basic 
                                color="blue" 
                                content='Create Auto Signals' 
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
        </div>
    );
}

const mapStateToProps = (state) => ({
    autoSignal: state.autoSignal,
});

export default withRouter(connect(mapStateToProps)(AutoSignal));
