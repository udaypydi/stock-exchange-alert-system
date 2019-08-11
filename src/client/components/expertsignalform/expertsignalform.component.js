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

    function handleSignalNameChange(event) {
        const { dispatch } = props;
        const { value } = event.target; 
        dispatch(expertSignalNameChange(value))  
    }

    function handleSubmitFormData() {
        const { dispatch } = props;
        dispatch(submitExpertSignalData(props.expertSignal));
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
            <CustomSidebar />
            {
                !isLoading && !isSuccess ? (
                <div css={styles.container}>
                    <Segment fluid style={{ width: 1000 }}>
                        <div>
                            <div css={styles.headerContainer}>
                                <div>
                                    <p>Create Expert Signals</p>
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
                                        style={{ width: '50%' }}
                                        onChange={handleCurrencyPairChange}
                                        onFocus={() => setActiveElement('CURRENCY_PAIR')}
                                        onBlur={() => setActiveElement('')}
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
                                        style={{ width: '50%', justifyContent: 'space-evenly', display: 'flex', margin: 10 }}
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
                                        style={{ width: '50%', margin: 10 }} 
                                        placeholder='Trade Lots' 
                                        value={tradeLots}
                                        onChange={handleTradeLotsChange}
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
                                        style={{ width: '50%' }}
                                        onChange={handleIndicatorChange}
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
                                    </React.Fragment>    
                                </div>
                                <div css={styles.formContainer}>
                                    <Input 
                                        fluid 
                                        style={{ width: '50%', margin: 10 }} 
                                        placeholder='Stop Loss (No of pips)' 
                                        text={level}
                                        value={stopLoss}
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
                                        style={{ width: '50%', margin: 10 }} 
                                        placeholder='Target Profit (No of pips)' 
                                        text={level}
                                        targetProfit
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

function ExpertSignalFormComponent(props) {
    return (
        <div>
            <p>Create Expert Signal</p>
            <Divider />
            <div>
                {renderExpertSignal(props)}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    expertSignal: state.expertSignal,
});

export default connect(mapStateToProps)(ExpertSignalFormComponent);
