import React from 'react';
import { connect } from 'react-redux';
import { Input, Divider } from 'semantic-ui-react';
import { alertTimingChange } from './alerttiming.action';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styles from './alerttiming.styles';

function AlertTiming(props) {

    const { signalTiming, dispatch, showErrors } = props;
    const { total, daily } = signalTiming;

    const handleTimeExecutionChangeValue = (event, key) => {
        dispatch(alertTimingChange(parseInt(event.target.value), key));
    };

    return (
        <div>
            <div>
                <p>Timing</p>
            </div>
            <Divider />
            <div css={styles.formContainer} style={{ justifyContent: 'flex-start', marginLeft: 20 }}>
                <p style={{ marginBottom: 0 }}>Execution Limit:</p>
                <Input 
                    fluid 
                    style={{ width: '30%', margin: 10 }}
                    placeholder='Total Alerts for this signal' 
                    type="number"
                    value={total}
                    error={showErrors && !total}
                    onChange={(event) => handleTimeExecutionChangeValue(event, 'total')}
                />
                <label>Total</label>
                    <Input 
                    fluid 
                    style={{ width: '30%', margin: 10 }}
                    placeholder='Alerts in a day' 
                    type="number"
                    value={daily}
                    error={showErrors && !daily}
                    onChange={(event) => handleTimeExecutionChangeValue(event, 'daily')}
                />
                <label>Daily</label>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    signalTiming: state.signalTiming,
});

export default connect(mapStateToProps)(AlertTiming);
