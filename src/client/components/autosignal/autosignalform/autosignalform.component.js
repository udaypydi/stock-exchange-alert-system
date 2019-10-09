import React, { useState, useEffect } from 'react';
import { 
    Divider,
    Dropdown, 
    Checkbox, 
    Input, 
    Button, 
    Segment,
    Message,
    Icon,
    Responsive,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import AlertTiming from 'commons/alerttiming/alerttiming.component';
import Header from 'commons/header/header.component';
import Loader from 'commons/preLoader/preloader.component';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
import AutoSignalFormMobileComponent from './autosignalform.mobile.component';
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
    FORM_TOOLIPS,
    periodValueDropdownGenerator,
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
import './autosignalform.css';

function renderAutoSignalForm(props) {
    const [activeElement, setActiveElement] = useState('');
    const [ currentDate, setCurrentDate ] = useState(new Date());
    const [showErrors, setShowErrors] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Please fill all the form fields.');
    const [showErrorNotification, setshowErrorNotification] = useState(false);
    const { sidebar } = props;
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

    const { timeOut, timeOutHours } = signalTimeFrame;

    useEffect(() => {
        const { dispatch } = props;
        if (isLoading) {
            dispatch(toggleLoadingStatus());
        }
    }, []);

    function isFormDataValid() {
        const { signalTiming } = props;
        if (
            currencyPair 
            && signalName 
            && timeFrame 
            && indicator
            && signalTiming.total
            && signalTiming.daily
            && signalTiming.total >= signalTiming.daily
        ) {
            if (indicator === 'rsi') {
                if (indicatorParameters.level && indicatorParameters.period) {
                    return true;
                }
            } else if (indicator === 'bollinger_bands') {
                if (indicatorParameters.ohlc && indicatorParameters.period && indicatorParameters.deviation) {
                    return true;
                }
            } else if (indicator === 'simple_moving_average' || indicator === 'exponential_moving_average') {
                if (indicatorParameters.ohlc && indicatorParameters.period) {
                    return true;
                }
            } else if (indicator === 'macd') {
                const {
                    ohlc,
                    fast,
                    slow,
                    signal,
                } = indicatorParameters;
                if (ohlc && fast && slow && signal) {
                    return true;
                }
            }
        }

        if (
            currencyPair 
            && signalName 
            && timeFrame 
            && indicator
            && signalTiming.total
            && signalTiming.daily
            && signalTiming.total < signalTiming.daily
        ) {
            setErrorMessage('Total count should be more or equal to daily count');
        }
        return false;
    }

    function handleSignalNameChange(event) {
        const { dispatch } = props;
        const { value } = event.target; 
        dispatch(autoSignalNameChange(event.target.value))  
    }

    function handleSubmitFormData() {
        const { dispatch, signalTiming, signalMail } = props;
        const isValid = isFormDataValid();
        if (isValid) {
            dispatch(submitAutoSignalData({ ...props.autoSignal, ...signalTiming, ...signalMail }));
        } else {
            setShowErrors(true);
            setshowErrorNotification(true);
            setTimeout(() => {
                setshowErrorNotification(false);
            }, 3000);
            console.log('Error');
        }
        
    }

    function handleCurrencyPairChange(event, data) {
        const { dispatch } = props;
        dispatch(autoSignalCurrencyChange(data.value));
    }

    function handleTimeFrameChange(event, data) {
        const { dispatch } = props;
        dispatch(autoSignalTimeFrameChange(data.value));
    }

    function handleIndicatorChange(event, data) {
        const { dispatch }  = props;
        dispatch(autoSignalIndicatorChange(data.value));
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
        <div style={{ backgroundColor: '#222840' }}>
            <Header />
            <CustomSidebar />
            {
                showErrorNotification && (
                    <Message negative style={{ position: 'absolute', top: 100, right: 10, zIndex: 99999 }}>
                        <Message.Header>{errorMessage}</Message.Header>
                    </Message>
                )
            }
            {
                !isLoading && !isSuccess ? (
                <div css={styles.container} style={{ marginLeft: sidebar.sidebarOpen ? '65%' : '52%', backgroundColor: '#222840' }}>
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
                                    <p style={{ color: '#9c9fa6', fontSize: 20, fontWeight: 'bold' }}>Create Indicator Signals</p>
                                </div>
                            </div>
                            <Divider style={{ backgroundColor: '#34426f' }} />
                            <div style={{ marginLeft: 60, marginRight: 60 }}>
                                <div css={styles.formContainer}>
                                    <input
                                        style={{ width: '100%', margin: 10, backgroundColor: '#2b2e4c' }}
                                        placeholder='Signal name (ex: My golden crossover)' 
                                        css={styles.customInput}
                                        value={signalName}
                                        onInput={handleSignalNameChange}
                                        onFocus={() => setActiveElement('SIGNAL_NAME')}
                                        onBlur={() => setActiveElement('')}
                                        error={showErrors && !signalName}
                                    />
                                    {
                                        activeElement === 'SIGNAL_NAME' && (
                                            <div class="tooltip">
                                                <Icon name='info circle'  style={{ color: '#fff' }}/>
                                                <span class="tooltiptext">{FORM_TOOLIPS['SIGNAL_NAME']}</span>
                                            </div>
                                        )
                                    } 
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
                                        style={{ width: '50%', backgroundColor: '#2b2e4c', borderRadius: 0, color: '#ffffff' }}
                                        onFocus={() => setActiveElement('CURRENCY_PAIR')}
                                        onBlur={() => setActiveElement('')}
                                        error={showErrors && !currencyPair}
                                    />
                                    {
                                        activeElement === 'CURRENCY_PAIR' && (
                                            <div class="tooltip">
                                                <Icon name='info circle'  style={{ color: '#fff' }}/>
                                                <span class="tooltiptext">{FORM_TOOLIPS['CURRENCY_PAIR']}</span>
                                            </div>
                                        )
                                    } 
                                    <Dropdown
                                        placeholder='Select timeframe ex:1 hour'
                                        fluid
                                        selection
                                        options={TIMEFRAME_OPTIONS} 
                                        css={styles.dropdownContainer}
                                        text={timeFrame}
                                        onChange={handleTimeFrameChange}
                                        style={{ width: '50%', backgroundColor: '#2b2e4c', borderRadius: 0, color: '#ffffff' }}
                                        onFocus={() => setActiveElement('TIME_FRAME')}
                                        onBlur={() => setActiveElement('')}
                                        error={showErrors && !timeFrame}
                                    />
                                    {
                                        activeElement === 'TIME_FRAME' && (
                                            <div class="tooltip">
                                                <Icon name='info circle'  style={{ color: '#fff' }}/>
                                                <span class="tooltiptext">{FORM_TOOLIPS['TIME_FRAME']}</span>
                                            </div>
                                        )
                                    } 
                                    {/* <div 
                                        onFocus={() => setActiveElement('SIGNAL_TYPE')}
                                        onBlur={() => setActiveElement('')}
                                        style={{ width: '50%', justifyContent: 'space-evenly', display: 'flex', margin: 10 }}
                                    >
                                        <Checkbox label="Buy Alerts" onChange={() => handleAlertsSelect('buy')} checked={alerts.indexOf('buy') !== -1} />
                                        <Checkbox label="Sell Alerts" onChange={() => handleAlertsSelect('sell')} checked={alerts.indexOf('sell') !== -1} />
                                        <Checkbox label="Both" onChange={() => handleAlertsSelect('both')} checked={alerts.length === 2} />
                                    </div> */}
                                    {
                                        activeElement === 'SIGNAL_TYPE' && (
                                            <div class="tooltip">
                                                <Icon name='info circle'  style={{ color: '#fff' }}/>
                                                <span class="tooltiptext">{FORM_TOOLIPS['SIGNAL_TYPE']}</span>
                                            </div>
                                        )
                                    } 
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
                                        style={{ backgroundColor: '#2b2e4c', borderRadius: 0, color: '#ffffff' }}
                                        onChange={handleIndicatorChange}
                                        onFocus={() => setActiveElement('INDICATOR')}
                                        onBlur={() => setActiveElement('')}
                                        error={showErrors && !indicator}
                                    />
                                     {
                                        activeElement === 'INDICATOR' && (
                                            <div class="tooltip">
                                                <Icon name='info circle'  style={{ color: '#fff' }}/>
                                                <span class="tooltiptext">{FORM_TOOLIPS['INDICATOR']}</span>
                                            </div>
                                        )
                                    } 
                                    <React.Fragment>
                                        {
                                            indicator !== 'macd' && (
                                                <Dropdown
                                                    placeholder='Period'
                                                    fluid
                                                    search
                                                    selection
                                                    options={periodValueDropdownGenerator()}
                                                    style={{ width: '50%', margin: 10, backgroundColor: '#2b2e4c', borderRadius: 0, color: '#ffffff' }} 
                                                    css={styles.dropdownContainer}
                                                    text={period}
                                                    error={showErrors && !period}
                                                    onChange={(event, data) => handleIndicatorParamsChange(event, data, 'period')}
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
                                                style={{ width: '50%', margin: 10, backgroundColor: '#2b2e4c', borderRadius: 0, color: '#ffffff' }} 
                                                css={styles.dropdownContainer}
                                                text={ohlc}
                                                error={showErrors && !ohlc}
                                                onChange={(event, data) => handleIndicatorParamsChange(event, data, 'ohlc')}
                                            />
                                        ) : (
                                            <input 
                                                fluid 
                                                style={{ width: '50%', margin: 10, backgroundColor: '#2b2e4c' }} 
                                                css={styles.customInput}
                                                placeholder='Level' 
                                                text={level}
                                                error={showErrors && !level}
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
                                                style={{ width: '50%', margin: 10, backgroundColor: '#2b2e4c', borderRadius: 0, color: '#ffffff' }} 
                                                css={styles.dropdownContainer}
                                                text={deviation}
                                                error={showErrors && !deviation}
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
                                            style={{ width: '50%', margin: 10, backgroundColor: '#2b2e4c', borderRadius: 0, color: '#ffffff' }} 
                                            css={styles.dropdownContainer}
                                            text={fast}
                                            error={showErrors && !fast}
                                            onChange={(event, data) => handleIndicatorParamsChange(event, data, 'fast')}
                                        />
                                        <Dropdown
                                            placeholder='Slow'
                                            fluid
                                            search
                                            selection
                                            options={MACD_PARAMETERS.slow} 
                                            style={{ width: '50%', margin: 10, backgroundColor: '#2b2e4c', borderRadius: 0, color: '#ffffff' }} 
                                            css={styles.dropdownContainer}
                                            text={slow}
                                            error={showErrors && !slow}
                                            onChange={(event, data) => handleIndicatorParamsChange(event, data, 'slow')}
                                        />
                                        <Dropdown
                                            placeholder='Signal'
                                            fluid
                                            search
                                            selection
                                            options={MACD_PARAMETERS.signal} 
                                            style={{ width: '50%', margin: 10, backgroundColor: '#2b2e4c', borderRadius: 0, color: '#ffffff' }} 
                                            css={styles.dropdownContainer}
                                            text={signal}
                                            error={showErrors && !signal}
                                            onChange={(event, data) => handleIndicatorParamsChange(event, data, 'signal')}
                                        />
                                    </div>
                                )}
                                <div style={{ marginTop: 20, marginLeft: '-50px' }}>
                                    <AlertTiming showErrors={showErrors}/>
                                </div> 
                                <div style={{ display: 'flex', flex: 1, justifyContent: 'center', marginTop: 20 }}>
                                    <button 
                                        style={{
                                            color: '#fff',
                                            backgroundColor: '#405189',
                                            borderColor: '#405189',
                                            padding: 10,
                                            cursor: 'pointer'
                                        }}
                                        onClick={handleSubmitFormData}
                                    >
                                        Create Signals
                                    </button>
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
        <React.Fragment>
             <Helmet>
                <meta charSet="utf-8" />
                <title>Signalant - Create Indicator Signals</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <Responsive minWidth={701}>
                <div style={{ backgroundColor: '#222840' }}>
                    <p>Create AutoSignals</p>
                    <Divider />
                    <div>
                        {renderAutoSignalForm(props)}
                    </div>
                </div>
            </Responsive>
            <Responsive maxWidth={700}>
                <AutoSignalFormMobileComponent />
            </Responsive>
        </React.Fragment> 
    );
}

const mapStateToProps = (state) => ({
    autoSignal: state.autoSignal,
    signalMail: state.signalMail,
    signalTiming: state.signalTiming,
    sidebar: state.sidebar,
});

export default connect(mapStateToProps)(AutoSignalFormComponent);
