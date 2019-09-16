import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
    Segment, 
    Divider, 
    Dropdown, 
    Input, 
    Checkbox, 
    Button, 
    Icon,
    Responsive,
    Message,
} from 'semantic-ui-react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import Header from 'commons/header/header.component';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
import AlertTimingMobile from 'commons/alerttiming/alerttiming.mobile.component';
import MailConfigurationForm from 'commons/mailconfiguration/mailconfiguration.component';
import AlertTiming from 'commons/alerttiming/alerttiming.component';
import { CURRENCY_OPTIONS, TIMEFRAME_OPTIONS, FORM_TOOLIPS } from './pricealertsform.constant';
import { 
    priceAlertNameChange, 
    priceAlertCurrencyPair,
    priceAlertPriceChange,
    priceAlertTimeFrameChange,
    priceAlertTimeIntervalChange,
    priceAlertTimeOutHoursChange,
    createTraderPriceAlerts,
    priceAlertTypeSelect,
} from './pricealertsform.action';
import styles from './pricealertsform.styles';
import './pricealertsform.css';

function PriceAlertsForm(props) {
    const [activeElement, setActiveElement] = useState('');
    const [showErrors, setShowErrors] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Please fill all the form fields.');
    const [showErrorNotification, setshowErrorNotification] = useState(false);
    const { priceAlert, dispatch, sidebar, signalMail, signalTiming } = props;

    const {
        name,
        currencyPair,
        price,
        alerts,
        timeFrame,
        timeBetweenAlerts,
        timeOutHours,
        executionLimit,
    } = priceAlert;

    const { total, daily } = executionLimit;

    function isFormDataValid() {
        const { signalTiming } = props;
        if (
            currencyPair 
            && name 
            && alerts.length 
            && price
            && signalTiming.total
            && signalTiming.daily
            && signalTiming.total >= signalTiming.daily
        ) {
            return true;
        }

        if (
            currencyPair 
            && name 
            && alerts.length 
            && price
            && signalTiming.total
            && signalTiming.daily
            && signalTiming.total < signalTiming.daily
        ) {
            setErrorMessage('Total count should be more or equal to daily count');
        }
        return false;
    }

    const handlePriceAlertNameChange = (event) => {
        dispatch(priceAlertNameChange(event.target.value));
    };

    const handleCurrencyPairChange = (event, data) => {
        dispatch(priceAlertCurrencyPair(data.value));
    };

    const handlePriceAlertPriceChange = (event) => {
        dispatch(priceAlertPriceChange(event.target.value));
    };

    const handleTimeFrameChange = (event, data) => {
        dispatch(priceAlertTimeFrameChange(data.value));
    };

    const handleTimeIntervalChange = (event) => {
        dispatch(priceAlertTimeIntervalChange(event.target.value));
    };

    const handleTimeOutHoursChange = (event) => {
        dispatch(priceAlertTimeOutHoursChange(parseInt(event.target.value)));
    };

    function handleAlertsSelect(key) {
        const { dispatch } = props;
        dispatch(priceAlertTypeSelect(key));
    }

    function handleAlertSubmit() {
        const { signalTiming, signalMail } = props;
        const isValid = isFormDataValid();
        if (isValid) {
            createTraderPriceAlerts({ ...priceAlert, ...signalMail, ...signalTiming });
        } else {
            setShowErrors(true);
            setshowErrorNotification(true);
            setTimeout(() => {
                setshowErrorNotification(false);
            }, 3000);
            console.log('Error');
        }
    }
    return (
        <div>
             <Helmet>
                <meta charSet="utf-8" />
                <title>Signalant - Create Price Alerts</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
         <Responsive minWidth={701}>
                <Header />
                <CustomSidebar />
                {
                    showErrorNotification && (
                        <Message negative style={{ position: 'absolute', top: 100, right: 10, zIndex: 99999 }}>
                            <Message.Header>{errorMessage}</Message.Header>
                        </Message>
                    )
                }
                <Segment 
                    style={{ 
                        width: sidebar.sidebarOpen ? 1000 : 1200, 
                        marginLeft: sidebar.sidebarOpen ? 350 : 150, 
                        marginTop: '10%',
                        backgroundColor: '#131633',
                        border: '1px solid #313452',
                        padding: 20
                    }} basic>
                    <div>
                        <p style={{ color: '#9c9fa6', fontSize: 20, fontWeight: 'bold' }}>Calculation Properties</p>
                    </div>
                    <Divider style={{ backgroundColor: '#34426f' }} />
                    <div css={styles.formContainer}>
                        <input 
                            fluid 
                            style={{ width: '100%', margin: 10 }}
                            placeholder='Signal Name' 
                            value={name}
                            style={{ 
                                width: '100%', 
                                margin: 10, 
                                backgroundColor: '#2b2e4c',
                                padding: 10,
                                border: 0, 
                            }}
                            onChange={handlePriceAlertNameChange}
                            onFocus={() => setActiveElement('SIGNAL_NAME')}
                            onBlur={() => setActiveElement('')}
                            error={showErrors && !name}
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
                            value={currencyPair}
                            css={styles.dropdownContainer}
                            onChange={handleCurrencyPairChange}
                            options={CURRENCY_OPTIONS} 
                            style={{ width: '50%', backgroundColor: '#2b2e4c', borderRadius: 0 }}
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
                        <input 
                            fluid 
                            style={{ 
                                width: '50%', 
                                margin: 10, 
                                backgroundColor: '#2b2e4c',
                                padding: 10,
                                border: 0, 
                            }}
                            placeholder='Price' 
                            value={price}
                            onChange={handlePriceAlertPriceChange}
                            onFocus={() => setActiveElement('PRICE')}
                            onBlur={() => setActiveElement('')}
                            error={showErrors && !price}
                        />
                        {
                            activeElement === 'PRICE' && (
                                <div class="tooltip">
                                  <Icon name='info circle'  style={{ color: '#fff' }}/>
                                    <span class="tooltiptext">{FORM_TOOLIPS['PRICE']}</span>
                                </div>
                            )
                        }
                    </div>
                    <div css={styles.formContainer} style={{ justifyContent: 'flex-start', marginBottom: 20 }}>
                        <div 
                            style={{ 
                                width: '50%', 
                                justifyContent: 'space-between', 
                                display: 'flex', 
                                margin: 10,
                                alignItems: 'center',
                            }}
                            onFocus={() => setActiveElement('SIGNAL_TYPE')}
                            onBlur={() => setActiveElement('')}
                        >
                            <p style={{ margin: 0, color: '#9c9fa6' }}>Direction:</p>
                            <Checkbox 
                                label={<label style={{ color: '#9c9fa6' }}>Cross Above</label>}
                                onChange={() => handleAlertsSelect('high')} 
                                checked={alerts.indexOf('high') !== -1}
                                error={showErrors && !alerts.length}
                            />
                            <Checkbox 
                                 label={<label style={{ color: '#9c9fa6' }}>Cross Below</label>} 
                                onChange={() => handleAlertsSelect('low')} 
                                checked={alerts.indexOf('low') !== -1} 
                                error={showErrors && !alerts.length}
                            />
                            <Checkbox 
                                 label={<label style={{ color: '#9c9fa6' }}>Any</label>}
                                onChange={() => handleAlertsSelect('both')} 
                                checked={alerts.length === 2}
                                error={showErrors && !alerts.length}
                            />
                        </div>
                        {
                            activeElement === 'SIGNAL_TYPE' && (
                                <div class="tooltip">
                                  <Icon name='info circle'  style={{ color: '#fff' }}/>
                                    <span class="tooltiptext">{FORM_TOOLIPS['SIGNAL_TYPE']}</span>
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
                            style={{ width: '50%', backgroundColor: '#2b2e4c', borderRadius: 0 }}
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
                    </div>
                    <div>
                        <AlertTiming showErrors={showErrors} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
                        <button 
                            style={{
                                color: '#fff',
                                backgroundColor: '#405189',
                                borderColor: '#405189',
                                padding: 10,
                                cursor: 'pointer'
                            }}
                            onClick={handleAlertSubmit}
                        >
                            Create Alerts
                        </button>
                    </div>
                </Segment>
          </Responsive>
          <Responsive maxWidth={700}>
              <Header />
              {
                  sidebar.mobileSidebarOpen && (
                    <CustomSidebar />
                  )
              }
                 <Segment style={{ marginTop: '20%' }} raised>
                    <div>
                        <p>Calculation Properties</p>
                    </div>
                    <Divider />
                    <div css={styles.formContainer}>
                        <Input 
                            fluid 
                            style={{ width: '100%', margin: 10 }}
                            placeholder='Signal Name' 
                            value={name}
                            onChange={handlePriceAlertNameChange}
                            onFocus={() => setActiveElement('SIGNAL_NAME')}
                            onBlur={() => setActiveElement('')}
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
                            value={currencyPair}
                            css={styles.dropdownContainer}
                            onChange={handleCurrencyPairChange}
                            options={CURRENCY_OPTIONS} 
                            style={{ width: '50%' }}
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
                        <Input 
                            fluid 
                            style={{ width: '50%', margin: 10 }}
                            placeholder='Price' 
                            value={price}
                            onChange={handlePriceAlertPriceChange}
                            onFocus={() => setActiveElement('PRICE')}
                            onBlur={() => setActiveElement('')}
                        />
                        {
                            activeElement === 'PRICE' && (
                                <div class="tooltip">
                                  <Icon name='info circle'  style={{ color: '#fff' }}/>
                                    <span class="tooltiptext">{FORM_TOOLIPS['PRICE']}</span>
                                </div>
                            )
                        }
                    </div>
                    <div css={styles.formContainer} style={{ justifyContent: 'flex-start', marginBottom: 20 }}>
                        <div 
                            style={{ 
                                width: '100%', 
                                justifyContent: 'space-between', 
                                display: 'flex', 
                                margin: 10,
                                alignItems: 'center',
                            }}
                            onFocus={() => setActiveElement('SIGNAL_TYPE')}
                            onBlur={() => setActiveElement('')}
                        >
                            <p style={{ margin: 0 }}>Direction:</p>
                            <Checkbox label="Cross Above" onChange={() => handleAlertsSelect('high')} checked={alerts.indexOf('high') !== -1} />
                            <Checkbox label="Cross Below" onChange={() => handleAlertsSelect('low')} checked={alerts.indexOf('low') !== -1} />
                            <Checkbox label="Any" onChange={() => handleAlertsSelect('both')} checked={alerts.length === 2} />
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
                    <div>
                        <Dropdown
                            placeholder='Select timeframe ex:1 hour'
                            fluid
                            selection
                            options={TIMEFRAME_OPTIONS} 
                            css={styles.dropdownContainer}
                            text={timeFrame}
                            onChange={handleTimeFrameChange}
                            style={{ width: '100%' }}
                            onFocus={() => setActiveElement('TIME_FRAME')}
                            onBlur={() => setActiveElement('')}
                        />
                        {
                            activeElement === 'TIME_FRAME' && (
                                <div class="tooltip">
                                  <Icon name='info circle'  style={{ color: '#fff' }}/>
                                    <span class="tooltiptext">{FORM_TOOLIPS['TIME_FRAME']}</span>
                                </div>
                            )
                        } 
                    </div>
                    <div>
                        <AlertTimingMobile />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
                        <Button 
                            color="blue" 
                            content='Create Alert'
                            onClick={handleAlertSubmit}
                        />
                    </div>
                </Segment>
          </Responsive>
        </div>
       
    );
}

const mapStateToProps = (state) => ({
    priceAlert: state.priceAlert,
    sidebar: state.sidebar,
    signalMail: state.signalMail,
    signalTiming: state.signalTiming,
});

export default connect(mapStateToProps)(PriceAlertsForm);
