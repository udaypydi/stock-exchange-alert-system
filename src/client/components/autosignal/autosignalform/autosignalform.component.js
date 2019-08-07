import React, { useState, useEffect } from 'react';
import { 
    Divider,
    Dropdown, 
    Checkbox, 
    Input, 
    Button, 
    Segment,
    Message,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import TimezonePicker from 'react-timezone';
import Header from 'commons/header/header.component';
import Loader from 'commons/preLoader/preloader.component';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
import "react-datepicker/dist/react-datepicker.css";
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { 
    CURRENCY_OPTIONS, 
    TIMEFRAME_OPTIONS, 
    INDICATOR_CONSTANTS, 
    AUTO_SIGNAL_FORM_INITIAL_STATE,
    INDICATOR_KEY_VALUE_MAP,
    OHLC,
    MACD_PARAMETERS,
} from './autosignalform.constants';
import { 
    autoSignalNameChange, 
    submitAutoSignalData,
    autoSignalIndicatorChange,
    devitaionConstantGenerator,
    autoSignalIndicatorParamChange,
    autoSignalCurrencyChange,
    autoSignalTimeFrameChange,
    autoSignalTradeLotsChange,
    autoSignalAlertsSelect,
    autoSignalIntervalUpdate,
    toggleLoadingStatus,
} from './autosignalform.action';
// import AutoSignalFormReducer from './autosignalform.reducer';
import styles from './autosignalform.styles';

function renderAutoSignalForm(props) {

    const [ currentDate, setCurrentDate ] = useState(new Date());

    const {    
        currencyPair,
        timeFrame,
        alerts,
        indicator,
        indicatorParameters,
        signalTimeFrame,
        signalName,
        addToProfile,
        tradeLots,
        isLoading,
        isSuccess,
    } = props.autoSignal;

    const {
        period,
        ohlc,
        fast,
        slow,
        signal,
        level,
        deviation, 
    } = indicatorParameters;

    const { startTime, endTime, timeZone, timeOut } = signalTimeFrame;

    useEffect(() => {
        const { dispatch } = props;
        if (isLoading) {
            dispatch(toggleLoadingStatus());
        }
    }, []);

    function handleSignalNameChange(event) {
        const { dispatch } = props;
        const { value } = event.target; 
        dispatch(autoSignalNameChange(event.target.value))  
    }

    function handleSubmitFormData() {
        const { dispatch } = props;
        dispatch(submitAutoSignalData(props.autoSignal));
    }

    function handleCurrencyPairChange(event, data) {
        const { dispatch } = props;
        dispatch(autoSignalCurrencyChange(data.value));
    }

    function handleTimeFrameChange(event, data) {
        const { dispatch } = props;
        dispatch(autoSignalTimeFrameChange(data.value));
    }

    function handleTradeLotsChange(event) {
        const { dispatch } = props;
        dispatch(autoSignalTradeLotsChange(event.target.value));
    }

    function handleIndicatorChange(event, data) {
        const { dispatch }  = props;
        dispatch(autoSignalIndicatorChange(data.value));
    }

    function handleAlertsSelect(key) {
        const { dispatch } = props;
        dispatch(autoSignalAlertsSelect(key));
    }

    function handleSignalTimeFrameChange(value, key) {
        const { dispatch } = props;
        dispatch(autoSignalIntervalUpdate(value, key));
    }

    function handleIndicatorParamsChange(event, data, key) {
        const { dispatch } = props;

        if (data) {
            dispatch(autoSignalIndicatorParamChange(data.value, key));
        } else {
            dispatch(autoSignalIndicatorParamChange(event.target.value, key));
        }
    }

    return (
        <div style={{ backgroundColor: '#f0f2f5'}}>
            <Header />
            <CustomSidebar />
            {
                !isLoading && !isSuccess ? (
                <div css={styles.container}>
                    <Segment fluid style={{ width: 1000 }}>
                        <div>
                            <div css={styles.headerContainer}>
                                <div>
                                    <p>Create Auto Signals</p>
                                </div>
                            </div>
                            <Divider />
                            <div style={{ marginLeft: 60, marginRight: 60 }}>
                                <div css={styles.formContainer}>
                                    <Input 
                                        fluid 
                                        style={{ width: '100%', margin: 10 }}
                                        placeholder='Signal name (ex: My golden crossover)' 
                                        value={signalName}
                                        onChange={handleSignalNameChange}
                                    />
                                </div>
                                <div css={styles.formContainer}>
                                    <Dropdown
                                        placeholder='Add currency pair'
                                        fluid
                                        search
                                        selection
                                        options={CURRENCY_OPTIONS} 
                                        css={styles.dropdownContainer}
                                        text={currencyPair}
                                        onChange={handleCurrencyPairChange}
                                        style={{ width: '30%' }}
                                    />
                                    <Dropdown
                                        placeholder='Select timeframe ex:1 hour'
                                        fluid
                                        selection
                                        options={TIMEFRAME_OPTIONS} 
                                        css={styles.dropdownContainer}
                                        text={timeFrame}
                                        onChange={handleTimeFrameChange}
                                        style={{ width: '30%' }}
                                    />
                                    <div style={{ width: '50%', justifyContent: 'space-evenly', display: 'flex', margin: 10 }}>
                                        <Checkbox label="Buy Alerts" onChange={() => handleAlertsSelect('buy')} checked={alerts.indexOf('buy') !== -1} />
                                        <Checkbox label="Sell Alerts" onChange={() => handleAlertsSelect('sell')} checked={alerts.indexOf('sell') !== -1} />
                                        <Checkbox label="Both" onChange={() => handleAlertsSelect('both')} checked={alerts.length === 2} />
                                    </div>
                                </div>
                                <div css={styles.formContainer}>
                                    <Dropdown
                                        placeholder='Add indicator'
                                        fluid
                                        search
                                        selection
                                        options={INDICATOR_CONSTANTS} 
                                        css={styles.dropdownContainer}
                                        text={INDICATOR_KEY_VALUE_MAP[indicator]}
                                        onChange={handleIndicatorChange}
                                    />
                                    <React.Fragment>
                                        {
                                            indicator !== 'macd' && (
                                                <Input 
                                                    fluid 
                                                    style={{ width: '50%', margin: 10 }} 
                                                    placeholder='Period' 
                                                    value={period}
                                                    onChange={(event) => handleIndicatorParamsChange(event, undefined, 'period')}
                                                />
                                            )
                                        }
                                        {indicator !== 'rsi' ? (
                                            <Dropdown
                                                placeholder='OHLC'
                                                fluid
                                                search
                                                selection
                                                options={OHLC} 
                                                style={{ width: '50%', margin: 10 }} 
                                                css={styles.dropdownContainer}
                                                text={ohlc}
                                                onChange={(event, data) => handleIndicatorParamsChange(event, data, 'ohlc')}
                                            />
                                        ) : (
                                            <Input 
                                                fluid 
                                                style={{ width: '50%', margin: 10 }} 
                                                placeholder='Level' 
                                                text={level}
                                                onChange={(event) => handleIndicatorParamsChange(event, undefined, 'level')}
                                            />
                                        )}
                                        {indicator === 'bollinger_bands' && (
                                            <Dropdown
                                                placeholder='DEVIATION'
                                                fluid
                                                search
                                                selection
                                                options={devitaionConstantGenerator()} 
                                                style={{ width: '50%', margin: 10 }} 
                                                css={styles.dropdownContainer}
                                                text={deviation}
                                                onChange={(event, data) => handleIndicatorParamsChange(event, data, 'deviation')}
                                            />
                                        )
                                        }
                                    </React.Fragment>    
                                </div>
                                {indicator === 'macd' && (
                                    <div css={styles.formContainer}>
                                        <Dropdown
                                            placeholder='Fast'
                                            fluid
                                            search
                                            selection
                                            options={MACD_PARAMETERS.fast} 
                                            style={{ width: '50%', margin: 10 }} 
                                            css={styles.dropdownContainer}
                                            text={fast}
                                            onChange={(event, data) => handleIndicatorParamsChange(event, data, 'fast')}
                                        />
                                        <Dropdown
                                            placeholder='Slow'
                                            fluid
                                            search
                                            selection
                                            options={MACD_PARAMETERS.slow} 
                                            style={{ width: '50%', margin: 10 }} 
                                            css={styles.dropdownContainer}
                                            text={slow}
                                            onChange={(event, data) => handleIndicatorParamsChange(event, data, 'slow')}
                                        />
                                        <Dropdown
                                            placeholder='Signal'
                                            fluid
                                            search
                                            selection
                                            options={MACD_PARAMETERS.signal} 
                                            style={{ width: '50%', margin: 10 }} 
                                            css={styles.dropdownContainer}
                                            text={signal}
                                            onChange={(event, data) => handleIndicatorParamsChange(event, data, 'signal')}
                                        />
                                    </div>
                                )}
                                <div css={styles.dateContainer}>
                                    <p>Signal Timeframe:</p>
                                    <Input 
                                        fluid 
                                        style={{ width: 140, margin: 10 }} 
                                        placeholder='Timeout in (seconds)' 
                                        text={timeOut}
                                        onChange={(event) => handleSignalTimeFrameChange(event.target.value, 'timeOut')}
                                    />
                                    <DatePicker
                                        selected={startTime}
                                        onChange={(date) => handleSignalTimeFrameChange(date, 'startTime')}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        timeCaption="time"
                                        css={styles.datePickerComponent}
                                        style={{
                                            padding: '10px',
                                            border: '1px solid #cccccc'
                                        }}
                                    />
                                    <DatePicker
                                        selected={endTime}
                                        onChange={(date) => handleSignalTimeFrameChange(date, 'endTime')}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        timeCaption="time"
                                        css={styles.datePickerComponent}
                                        style={{
                                            padding: '10px',
                                            border: '1px solid #cccccc'
                                        }}
                                    />
                                    <TimezonePicker
                                        value="Asia/Yerevan"
                                        onChange={(timeZone) => handleSignalTimeFrameChange(timeZone, 'timeZone')}
                                        inputProps={{
                                            placeholder: 'Select Timezone...',
                                            name: 'timezone',
                                        }}
                                    />
                                </div>
                                <div style={{ display: 'flex', flex: 1, justifyContent: 'center', marginTop: 20 }}>
                                    <Button 
                                        color="blue" 
                                        content='Create Signals'
                                        onClick={handleSubmitFormData}
                                    />
                                </div>
                            </div>
                        </div>
                    </Segment>
                </div>
                ) : (
                    <Loader />
                )
            }
            {
                isSuccess && (
                    <Message
                        success
                        header='Signal Created Successfully'
                        style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            width: 250,
                        }}
                    />
                )
            }
            
       </div> 
       
    );
}

function AutoSignalFormComponent(props) {
    return (
        <div style={{ backgroundColor: '#f0f2f5'}}>
            <p>Create AutoSignals</p>
            <Divider />
            <div>
                {renderAutoSignalForm(props)}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    autoSignal: state.autoSignal,
});

export default connect(mapStateToProps)(AutoSignalFormComponent);
