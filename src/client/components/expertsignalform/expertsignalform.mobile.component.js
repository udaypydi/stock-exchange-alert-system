import React, { useState, useEffect } from 'react';
import { 
    Divider,
    Dropdown, 
    Radio, 
    Input, 
    Button, 
    Segment,
    Message,
    Icon,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import Loader from 'commons/preLoader/preloader.component';
import Header from 'commons/header/header.component';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
import MailConfigurationForm from 'commons/mailconfiguration/mailconfiguration.component';
import AlertTimingMobile from 'commons/alerttiming/alerttiming.mobile.component';
import "react-datepicker/dist/react-datepicker.css";
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { 
    CURRENCY_OPTIONS, 
    INDICATOR_CONSTANTS, 
    INDICATOR_KEY_VALUE_MAP,
    OHLC,
    MACD_PARAMETERS,
    FORM_TOOLIPS,
} from './expertsignalform.constant';
import { 
    expertSignalNameChange, 
    submitExpertSignalData,
    expertSignalIndicatorChange,
    devitaionConstantGenerator,
    expertSignalIndicatorParamChange,
    expertSignalCurrencyChange,
    expertSignalTimeFrameChange,
    expertSignalTradeLotsChange,
    expertSignalAlertsSelect,
    expertSignalIntervalUpdate,
    toggleLoadingStatus,
    profitLossTargetChange,
} from './expertsignalform.action';
import styles from './expertsignalform.styles';
import './expertsignalform.css';

function renderExpertSignal(props) {
    const [activeElement, setActiveElement] = useState('');
    const [showErrors, setShowErrors] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Please fill all the form fields.');
    const [showErrorNotification, setshowErrorNotification] = useState(false);
    const {    
        currencyPair,
        alerts,
        indicator,
        indicatorParameters,
        signalTimeFrame,
        signalName,
        tradeLots,
        isLoading,
        isSuccess,
        stopLoss,
        targetProfit,
    } = props.expertSignal;
    const { signalMail, signalTiming, sidebar} = props;

    const {
        period,
        ohlc,
        fast,
        slow,
        signal,
        level,
        deviation, 
    } = indicatorParameters;


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
            && alerts.length 
            && indicator
            && stopLoss
            && targetProfit
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
            && alerts.length 
            && indicator
            && stopLoss
            && targetProfit
            && signalTiming.total
            && signalTiming.daily
            && signalTiming.total < signalTiming.daily
        ) {
            setErrorMessage('Total count should be more or equal to daily count');
        }
        return false;
    }

    function isFormDataValid() {
        const { signalTiming } = props;
        if (
            currencyPair 
            && signalName 
            && alerts.length 
            && indicator
            && stopLoss
            && targetProfit
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
            && alerts.length 
            && indicator
            && stopLoss
            && targetProfit
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
        dispatch(expertSignalNameChange(value))  
    }

    function handleSubmitFormData() {
        const { dispatch, signalTiming, signalMail } = props;
        const isValid = isFormDataValid();
        if (isValid) {
            dispatch(submitExpertSignalData({ ...props.expertSignal, ...signalTiming, ...signalMail }));
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
        dispatch(expertSignalCurrencyChange(data.value));
    }

    function handleTimeFrameChange(event, data) {
        const { dispatch } = props;
        dispatch(expertSignalTimeFrameChange(data.value));
    }

    function handleTradeLotsChange(event) {
        const { dispatch } = props;
        dispatch(expertSignalTradeLotsChange(event.target.value));
    }

    function handleIndicatorChange(event, data) {
        const { dispatch }  = props;
        dispatch(expertSignalIndicatorChange(data.value));
    }

    function handleAlertsSelect(key) {
        const { dispatch } = props;
        dispatch(expertSignalAlertsSelect(key));
    }

    function handleSignalTimeFrameChange(value, key) {
        const { dispatch } = props;
        dispatch(expertSignalIntervalUpdate(value, key));
    }

    function handleProfitLossChange(key, value) {
        const { dispatch } = props;
        dispatch(profitLossTargetChange(key, value));
    }

    function handleIndicatorParamsChange(event, data, key) {
        const { dispatch } = props;

        if (data) {
            dispatch(expertSignalIndicatorParamChange(data.value, key));
        } else {
            dispatch(expertSignalIndicatorParamChange(event.target.value, key));
        }
    }

    return (
        <div>
            <Header />
            {
                sidebar.mobileSidebarOpen && (
                    <CustomSidebar />
                )
            }
            {
                !isLoading && !isSuccess ? (
                <div style={{ margin: 10, marginTop: 100 }}>
                    <Segment fluid>
                        <div>
                            <div css={styles.headerContainer}>
                                <div>
                                    <p>Create Expert Signals</p>
                                </div>
                            </div>
                            <Divider />
                            <div>
                                <div css={styles.formContainer}>
                                    <Input 
                                        fluid 
                                        style={{ width: '100%', margin: 10 }}
                                        placeholder='Signal name (ex: My golden crossover)' 
                                        value={signalName}
                                        onChange={handleSignalNameChange}
                                        error={showErrors && !signalName}
                                        onFocus={() => setActiveElement('SIGNAL_NAME')}
                                        onBlur={() => setActiveElement('')}
                                    /> 
                                    {
                                        activeElement === 'SIGNAL_NAME' && (
                                            <div class="tooltip">
                                                <Icon name='info circle' />
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
                                        style={{ width: '100%' }}
                                        onChange={handleCurrencyPairChange}
                                        onFocus={() => setActiveElement('CURRENCY_PAIR')}
                                        onBlur={() => setActiveElement('')}
                                        error={showErrors && !currencyPair}
                                    />
                                    {
                                        activeElement === 'CURRENCY_PAIR' && (
                                            <div class="tooltip">
                                                <Icon name='info circle' />
                                                <span class="tooltiptext">{FORM_TOOLIPS['CURRENCY_PAIR']}</span>
                                            </div>
                                        )
                                    }    

                                    <div 
                                        style={{ width: '100%', justifyContent: 'space-evenly', display: 'flex', margin: 10 }}
                                        onFocus={() => setActiveElement('SIGNAL_TYPE')}
                                        onBlur={() => setActiveElement('')}
                                    >
                                        <Radio name='radioGroup' label="Buy Alerts" onChange={() => handleAlertsSelect('buy')} checked={alerts === 'buy'} />
                                        <Radio name='radioGroup' label="Sell Alerts" onChange={() => handleAlertsSelect('sell')} checked={alerts === 'sell'} />
                                    </div>
                                    {
                                        activeElement === 'SIGNAL_TYPE' && (
                                            <div class="tooltip">
                                                <Icon name='info circle' />
                                                <span class="tooltiptext">{FORM_TOOLIPS['SIGNAL_TYPE']}</span>
                                            </div>
                                        )
                                    } 
                                </div>
                                <div css={styles.formContainer}>
                                    <Input 
                                        fluid 
                                        style={{ width: '100%', margin: 10 }} 
                                        placeholder='Trade Lots' 
                                        value={tradeLots}
                                        onChange={handleTradeLotsChange}
                                        error={showErrors && !tradeLots}
                                        onFocus={() => setActiveElement('TRADE_LOTS')}
                                        onBlur={() => setActiveElement('')}
                                    />
                                    {
                                        activeElement === 'TRADE_LOTS' && (
                                            <div class="tooltip">
                                                <Icon name='info circle' />
                                                <span class="tooltiptext">{FORM_TOOLIPS['TRADE_LOTS']}</span>
                                            </div>
                                        )
                                    } 
                                    <Dropdown
                                        placeholder='Add indicator'
                                        fluid
                                        search
                                        selection
                                        options={INDICATOR_CONSTANTS} 
                                        css={styles.dropdownContainer}
                                        text={INDICATOR_KEY_VALUE_MAP[indicator]}
                                        style={{ width: '100%' }}
                                        onChange={handleIndicatorChange}
                                        error={showErrors && !indicator}
                                        onFocus={() => setActiveElement('INDICATOR')}
                                        onBlur={() => setActiveElement('')}
                                    />
                                    {
                                        activeElement === 'INDICATOR' && (
                                            <div class="tooltip">
                                                <Icon name='info circle' />
                                                <span class="tooltiptext">{FORM_TOOLIPS['INDICATOR']}</span>
                                            </div>
                                        )
                                    }  
                                </div>
                                <div css={styles.formContainer}>
                                    <React.Fragment>
                                        {
                                            indicator !== 'macd' && (
                                                <Input 
                                                    fluid 
                                                    style={{ width: '100%', margin: 10 }} 
                                                    placeholder='Period' 
                                                    value={period}
                                                    error={showErrors && !period}
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
                                                style={{ width: '100%', margin: 10 }} 
                                                css={styles.dropdownContainer}
                                                text={ohlc}
                                                error={showErrors && !ohlc}
                                                onChange={(event, data) => handleIndicatorParamsChange(event, data, 'ohlc')}
                                            />
                                        ) : (
                                            <Input 
                                                fluid 
                                                style={{ width: '100%', margin: 10 }} 
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
                                                style={{ width: '100%', margin: 10 }} 
                                                css={styles.dropdownContainer}
                                                text={deviation}
                                                error={showErrors && !deviation}
                                                onChange={(event, data) => handleIndicatorParamsChange(event, data, 'deviation')}
                                            />
                                        )
                                        }
                                           {indicator === 'macd' && (
                                                <div css={styles.formContainer}>
                                                    <Dropdown
                                                        placeholder='Fast'
                                                        fluid
                                                        search
                                                        selection
                                                        options={MACD_PARAMETERS.fast} 
                                                        style={{ width: '100%', margin: 10 }} 
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
                                                        style={{ width: '100%', margin: 10 }} 
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
                                                        style={{ width: '100%', margin: 10 }} 
                                                        css={styles.dropdownContainer}
                                                        text={signal}
                                                        error={showErrors && !signal}
                                                        onChange={(event, data) => handleIndicatorParamsChange(event, data, 'signal')}
                                                    />
                                                </div>
                                )}
                                    </React.Fragment>    
                                </div>
                                <div css={styles.formContainer}>
                                    <Input 
                                        fluid 
                                        style={{ width: '100%', margin: 10 }} 
                                        placeholder='Stop Loss (No of pips)' 
                                        text={level}
                                        value={stopLoss}
                                        error={showErrors && !stopLoss}
                                        onChange={(event) => handleProfitLossChange('loss', event.target.value)}
                                        onFocus={() => setActiveElement('STOP_LOSS')}
                                        onBlur={() => setActiveElement('')}
                                    />
                                       {
                                        activeElement === 'STOP_LOSS' && (
                                            <div class="tooltip">
                                                <Icon name='info circle' />
                                                <span class="tooltiptext">{FORM_TOOLIPS['STOP_LOSS']}</span>
                                            </div>
                                        )
                                        }  
                                    <Input 
                                        fluid 
                                        style={{ width: '100%', margin: 10 }} 
                                        placeholder='Target Profit (No of pips)' 
                                        text={targetProfit}
                                        value={targetProfit}
                                        targetProfit
                                        error={showErrors && !targetProfit}
                                        onChange={(event) => handleProfitLossChange('profit', event.target.value)}
                                        onFocus={() => setActiveElement('TARGET_PROFIT')}
                                        onBlur={() => setActiveElement('')}
                                    />
                                     {
                                        activeElement === 'TARGET_PROFIT' && (
                                            <div class="tooltip">
                                                <Icon name='info circle' />
                                                <span class="tooltiptext">{FORM_TOOLIPS['TARGET_PROFIT']}</span>
                                            </div>
                                        )
                                    }  
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <AlertTimingMobile showErrors={showErrors} />
                                </div>
                                {/* <div style={{ marginLeft: '-50px' }}>
                                    <MailConfigurationForm />
                                </div> */}
                                 {
                                    showErrorNotification && (
                                        <Message negative style={{ width: '90%' }}>
                                            <Message.Header>{errorMessage}</Message.Header>
                                        </Message>
                                    )
                                }
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

function ExpertSignalFormMobileComponent(props) {
    return (
        <div>
            {renderExpertSignal(props)}
        </div>
    )
}

const mapStateToProps = (state) => ({
    expertSignal: state.expertSignal,
    signalMail: state.signalMail,
    signalTiming: state.signalTiming,
    sidebar: state.sidebar,
});

export default connect(mapStateToProps)(ExpertSignalFormMobileComponent);
