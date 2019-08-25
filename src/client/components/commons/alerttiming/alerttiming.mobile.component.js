import React from 'react';
import { connect } from 'react-redux';
import { Input, Divider } from 'semantic-ui-react';
import { alertTimingChange } from './alerttiming.action';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styles from './alerttiming.styles';

function AlertTimingMobile(props) {

    const { signalTiming, dispatch } = props;
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
            <div style={{ marginLeft: 20 }}>
                <p style={{ marginBottom: 0 }}>Execution Limit:</p>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Input 
                        fluid 
                        style={{ width: '80%', margin: 10 }}
                        placeholder='Total Alerts for this signal' 
                        type="number"
                        value={total}
                        onChange={(event) => handleTimeExecutionChangeValue(event, 'total')}
                    />
                    <label>Total</label>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Input 
                        fluid 
                        style={{ width: '80%', margin: 10 }}
                        placeholder='Alerts in a day' 
                        type="number"
                        value={daily}
                        onChange={(event) => handleTimeExecutionChangeValue(event, 'daily')}
                    />
                    <label>Daily</label>
                </div>
                  
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    signalTiming: state.signalTiming,
})

export default connect(mapStateToProps)(AlertTimingMobile);
