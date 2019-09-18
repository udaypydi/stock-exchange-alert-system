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
    Responsive,
    Checkbox,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Loader from 'commons/preLoader/preloader.component';
import Header from 'commons/header/header.component';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
import MailConfigurationForm from 'commons/mailconfiguration/mailconfiguration.component';
import AlertTiming from 'commons/alerttiming/alerttiming.component';
import ExpertSignalFormMobileComponent from './expertsignalform.mobile.component';

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
    TIMEFRAME_OPTIONS,
    expiryTimeOptions,
    sampleData,
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
    const [currentMarketPrice, setCurrentMarketPrice] = useState({});
    const [selectedCurrencyPairPrice, setSelectedCurrencyPairPrice] = useState('');
    const [stopLossPrice, setStopLossPrice] = useState('');
    const [targetProfitPrice, setTargetProfitPrice] = useState('');
    const [selectedCurrencyPairPriceCount, setSelectedCurrencyPairPriceCount] = useState(0);
    const [targetProfitPriceCount, settargetProfitPriceCount] = useState(0);
    const [stopLossPriceCount, setStopLossPriceCount] = useState(0);
    const [expiryTime, setExpiryTime] = useState('');
    const [timeFrame, setTimeFrame] = useState('');

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
    const { signalMail, signalTiming, sidebar } = props;


    useEffect(() => {
        const { dispatch } = props;
        if (isLoading) {
            dispatch(toggleLoadingStatus());
        }

        const currencyPairPrices = {};
        sampleData.forEach(currency => {
            currencyPairPrices[currency.symbol] = currency.price;
        });
        setCurrentMarketPrice(currencyPairPrices);

        // fetch(`https://forex.1forge.com/1.0.3/quotes?pairs=XAUUSD,XAGUSD,EURUSD,GBPUSD,AUDUSD,NZDUSD,USDCAD,USDCHF,USDJPY,EURGBP,EURCHF,EURJPY&api_key=uD3ghInLCfnn7gsSKAwV3D1nnp1X55x8`)
        //     .then(res => res.json())
        //     .then(json => {
        //         const currencyPairPrices = {};
        //         json.forEach(currency => {
        //             currencyPairPrices[currency.symbol] = currency.price;
        //         })
        //         setCurrentMarketPrice(currencyPairPrices);
        //     })
    }, []);

    function isFormDataValid() {
        const { signalTiming } = props;
        if (
            currencyPair
            && signalName
            && alerts
            && indicator
            && stopLoss
            && targetProfit
            && expiryTime
        ) {
            return true;
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
        setSelectedCurrencyPairPrice(currentMarketPrice[data.value]);
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
        const { dispatch } = props;
        dispatch(expertSignalIndicatorChange(data.value));
    }

    function getStopLossTargetProfit(key) {
        let stopLossProfit = {};

        if (key === 'buy') {
            stopLossProfit = {
                stopLoss: selectedCurrencyPairPrice * 99 / 100,
                targetProfit: selectedCurrencyPairPrice * 101 / 100
            }
        } else {
            stopLossProfit = {
                stopLoss: selectedCurrencyPairPrice * 101 / 100,
                targetProfit: selectedCurrencyPairPrice * 99 / 100
            }
        }

        return stopLossProfit;
    }

    function setStopLossTargetProfit(key) {
        if (key === 'buy') {
            setStopLossPrice(selectedCurrencyPairPrice * 99 / 100);
            setTargetProfitPrice(selectedCurrencyPairPrice * 101 / 100);
        } else {
            setStopLossPrice(selectedCurrencyPairPrice * 101 / 100);
            setTargetProfitPrice(selectedCurrencyPairPrice * 99 / 100);
        }
    }

    function handleAlertsSelect(key) {
        const { dispatch } = props;
        dispatch(expertSignalAlertsSelect(key));
        setStopLossTargetProfit(key);
        setSelectedCurrencyPairPriceCount(0);
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
                    <div css={styles.container}>
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
                                        <p style={{ color: '#9c9fa6', fontSize: 20, fontWeight: 'bold' }}>Create Expert Signals</p>
                                    </div>
                                </div>
                                <Divider />
                                <div style={{ marginLeft: 60, marginRight: 60 }}>
                                    <div css={styles.formContainer}>
                                        <input
                                            fluid
                                            style={{
                                                width: '100%',
                                                margin: 10,
                                                backgroundColor: '#2b2e4c',
                                                padding: 10,
                                                border: 0,
                                            }}
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
                                                    <Icon name='info circle' style={{ color: '#ffffff' }}  />
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
                                            style={{ width: '50%', backgroundColor: '#2b2e4c', borderRadius: 0, color: '#ffffff' }}
                                            error={showErrors && !currencyPair}
                                            onChange={handleCurrencyPairChange}
                                            onFocus={() => setActiveElement('CURRENCY_PAIR')}
                                            onBlur={() => setActiveElement('')}
                                        />
                                        {
                                            activeElement === 'CURRENCY_PAIR' && (
                                                <div class="tooltip">
                                                    <Icon name='info circle'  style={{ color: '#fff' }}/>
                                                    <span class="tooltiptext">{FORM_TOOLIPS['CURRENCY_PAIR']}</span>
                                                </div>
                                            )
                                        }
                                        <input
                                            fluid
                                            style={{
                                                width: '45%',
                                                margin: 10,
                                                backgroundColor: '#2b2e4c',
                                                padding: 10,
                                                border: 0,
                                                color: '#ffffff' ,
                                            }}
                                            value={selectedCurrencyPairPrice}
                                            disabled
                                            placeholder='Price'
                                            onFocus={() => setActiveElement('PRICE')}
                                            onBlur={() => setActiveElement('')}
                                            error={showErrors && !price}
                                        />
                                        {selectedCurrencyPairPrice && (
                                            <div>
                                                {
                                                     selectedCurrencyPairPriceCount <= 10 && (
                                                        <button 
                                                        style={{ 
                                                            backgroundColor:  '#2b2e4c', 
                                                            color: '#ffffff', 
                                                            width: 25, 
                                                            borderRadius: 5 
                                                        }}
                                                        onClick={() => {
                                                            if (selectedCurrencyPairPriceCount <= 10) {
                                                                const countIncrease = selectedCurrencyPairPriceCount + 1;
                                                                const initialPrice = currentMarketPrice[currencyPair];
                                                                setSelectedCurrencyPairPrice(initialPrice * (100 + countIncrease) / 100);
                                                                setSelectedCurrencyPairPriceCount(countIncrease);
                                                                setStopLossTargetProfit(alerts);
                                                            }
                                                        }}
                                                        >+</button>
                                                     )
                                                }
                                               {
                                                   selectedCurrencyPairPrice >= 1 && (
                                                    <button 
                                                        style={{ 
                                                            backgroundColor:  '#2b2e4c', 
                                                            color: '#ffffff', 
                                                            width: 25, 
                                                            marginTop: 2, 
                                                            borderRadius: 5 
                                                        }}
                                                        onClick={() => {
                                                            if (selectedCurrencyPairPriceCount >= -10) {
                                                                const countIncrease = selectedCurrencyPairPriceCount - 1;
                                                                const initialPrice = currentMarketPrice[currencyPair];
                                                                setSelectedCurrencyPairPrice(initialPrice * (100 + countIncrease) / 100);
                                                                setSelectedCurrencyPairPriceCount(countIncrease);
                                                                setStopLossTargetProfit(alerts);
                                                            }
                                                        }}
                                                        >-</button>
                                                   )
                                               }
                                               
                                            </div>
                                        )
                                        }
                                        
                                    </div>
                                    <div css={styles.formContainer}>
                                        <input
                                            fluid
                                            style={{
                                                width: '50%',
                                                margin: 10,
                                                backgroundColor: '#2b2e4c',
                                                padding: 10,
                                                border: 0,
                                            }}
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
                                                    <Icon name='info circle'  style={{ color: '#fff' }}/>
                                                    <span class="tooltiptext">{FORM_TOOLIPS['TRADE_LOTS']}</span>
                                                </div>
                                            )
                                        }
                                        <div
                                            style={{
                                                width: '50%',
                                                justifyContent: 'space-between',
                                                display: 'flex',
                                                margin: 10,
                                                alignItems: 'center',
                                                color: '#ffffff'
                                            }}
                                            onFocus={() => setActiveElement('SIGNAL_TYPE')}
                                            onBlur={() => setActiveElement('')}
                                        >
                                            <Segment 
                                                style={{ width: '100%', justifyContent: 'space-evenly', display: 'flex', margin: 10 }}
                                                onFocus={() => setActiveElement('SIGNAL_TYPE')}
                                                onBlur={() => setActiveElement('')}
                                                error={showErrors && !alerts.length}
                                                basic
                                            >
                                                <Radio name='radioGroup' label={<label style={{ color: '#ffffff' }}>Buy Alerts</label>} onChange={() => handleAlertsSelect('buy')} checked={alerts === 'buy'} />
                                                <Radio name='radioGroup' label={<label style={{ color: '#ffffff' }}>Sell Alerts</label>} onChange={() => handleAlertsSelect('sell')} checked={alerts === 'sell'} />
                                            </Segment>
                                        </div>
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
                                        <input
                                            fluid
                                            style={{
                                                width: '50%',
                                                margin: 10,
                                                backgroundColor: '#2b2e4c',
                                                padding: 10,
                                                border: 0,
                                                color: '#ffffff'
                                            }}
                                            placeholder='Stop Loss (No of pips)'
                                            text={stopLoss}
                                            value={stopLossPrice}
                                            type="number"
                                            disabled
                                            error={showErrors && !stopLoss}
                                            onChange={(event) => handleProfitLossChange('loss', event.target.value)}
                                            onFocus={() => setActiveElement('STOP_LOSS')}
                                            onBlur={() => setActiveElement('')}
                                        />
                                        {
                                            selectedCurrencyPairPrice && (
                                                <div>
                                                    {
                                                        stopLossPriceCount < 0 && (
                                                        <button 
                                                            style={{ 
                                                                backgroundColor:  '#2b2e4c', 
                                                                color: '#ffffff', 
                                                                width: 25, 
                                                                borderRadius: 5 
                                                            }}
                                                            onClick={() => {
                                                                if (stopLossPriceCount < 0) {
                                                                    if (alerts === 'buy' && stopLossPrice <= selectedCurrencyPairPrice ||
                                                                        alerts === 'sell' && stopLossPrice >= selectedCurrencyPairPrice
                                                                    ) {
                                                                        const countIncrease = stopLossPriceCount + 1;
                                                                        const initialPrice = getStopLossTargetProfit(alerts);
                                                                        setStopLossPrice(initialPrice * (100 + countIncrease) / 100);
                                                                        setStopLossPriceCount(countIncrease);
                                                                    }
                                                                }
                                                            }}
                                                        >+</button>
                                                        )
                                                    }

                                                    {
                                                        stopLossPriceCount > -11 && (
                                                            <button 
                                                                style={{ 
                                                                    backgroundColor:  '#2b2e4c', 
                                                                    color: '#ffffff', 
                                                                    width: 25, 
                                                                    marginTop: 2, 
                                                                    borderRadius: 5 
                                                                }}

                                                                onClick={() => {
                                                                    if (stopLossPriceCount > -11) {
                                                                        if (alerts === 'buy' && stopLossPrice <= selectedCurrencyPairPrice ||
                                                                            alerts === 'sell' && stopLossPrice >= selectedCurrencyPairPrice
                                                                        ) {
                                                                            const countIncrease = stopLossPriceCount - 1;
                                                                            const initialPrice = getStopLossTargetProfit(alerts);
                                                                            setStopLossPrice(initialPrice * (100 + countIncrease) / 100);
                                                                            setStopLossPriceCount(countIncrease);
                                                                        }
                                                                    }
                                                                }}
                                                            >-</button>
                                                        )
                                                    }
                                                    
                                                    
                                                </div>
                                            )
                                        }
                                        {
                                            activeElement === 'STOP_LOSS' && (
                                                <div class="tooltip">
                                                    <Icon name='info circle'  style={{ color: '#fff' }}/>
                                                    <span class="tooltiptext">{FORM_TOOLIPS['STOP_LOSS']}</span>
                                                </div>
                                            )
                                        }
                                        <input
                                            fluid
                                            style={{
                                                width: '50%',
                                                margin: 10,
                                                backgroundColor: '#2b2e4c',
                                                padding: 10,
                                                border: 0,
                                                color: '#ffffff',
                                            }}
                                            placeholder='Target Profit (No of pips)'
                                            text={targetProfit}
                                            value={targetProfitPrice}
                                            type="number"
                                            disabled
                                            error={showErrors && !targetProfit}
                                            onChange={(event) => handleProfitLossChange('profit', event.target.value)}
                                            onFocus={() => setActiveElement('TARGET_PROFIT')}
                                            onBlur={() => setActiveElement('')}
                                        />
                                         {
                                            selectedCurrencyPairPrice && (
                                                <div>
                                                    <button style={{ backgroundColor:  '#2b2e4c', color: '#ffffff', width: 25, borderRadius: 5 }}>+</button>
                                                    <button style={{ backgroundColor:  '#2b2e4c', color: '#ffffff', width: 25, marginTop: 2, borderRadius: 5 }}>-</button>
                                                </div>
                                            )
                                        }
                                        {
                                            activeElement === 'TARGET_PROFIT' && (
                                                <div class="tooltip">
                                                    <Icon name='info circle'  style={{ color: '#fff' }}/>
                                                    <span class="tooltiptext">{FORM_TOOLIPS['TARGET_PROFIT']}</span>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div css={styles.formContainer}>
                                        <Dropdown
                                            placeholder='Select timeframe ex:1 hour'
                                            fluid
                                            selection
                                            options={TIMEFRAME_OPTIONS}
                                            css={styles.dropdownContainer}
                                            text={timeFrame}
                                            onChange={(event, data) => {
                                                setTimeFrame(data.value);
                                            }}
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
                                        <Dropdown
                                            placeholder='Select expiry time'
                                            fluid
                                            selection
                                            options={expiryTimeOptions()}
                                            css={styles.dropdownContainer}
                                            text={timeFrame}
                                            onChange={(event, data) => {
                                                setExpiryTime(data.value);
                                            }}
                                            style={{ width: '50%', backgroundColor: '#2b2e4c', borderRadius: 0, color: '#ffffff' }}
                                            onFocus={() => setActiveElement('EXPIRY_TIME')}
                                            onBlur={() => setActiveElement('')}
                                            error={showErrors && !timeFrame}
                                        />
                                        {
                                            activeElement === 'EXPIRY_TIME' && (
                                                <div class="tooltip">
                                                    <Icon name='info circle' style={{ color: '#ffffff' }} />
                                                    <span class="tooltiptext">{FORM_TOOLIPS['TIME_FRAME']}</span>
                                                </div>
                                            )
                                        }
                                    </div>
                                    {/* <div style={{ marginLeft: '-50px' }}>
                                    <MailConfigurationForm />
                                </div> */}

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

function ExpertSignalFormComponent(props) {
    return (
        <React.Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Signalant - Create Expert Signals</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <Responsive minWidth={701}>
                <div>
                    <p>Create Expert Signal</p>
                    <Divider />
                    <div>
                        {renderExpertSignal(props)}
                    </div>
                </div>
            </Responsive>
            <Responsive maxWidth={700}>
                <ExpertSignalFormMobileComponent />
            </Responsive>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    expertSignal: state.expertSignal,
    signalMail: state.signalMail,
    signalTiming: state.signalTiming,
    sidebar: state.sidebar,
});

export default connect(mapStateToProps)(ExpertSignalFormComponent);
