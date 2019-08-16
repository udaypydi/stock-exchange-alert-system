import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Segment, Divider, Dropdown, Input, Checkbox, Button, Icon } from 'semantic-ui-react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import Header from 'commons/header/header.component';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
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
    const { priceAlert, dispatch, sidebar } = props;

    const {
        name,
        currencyPair,
        price,
        alerts,
        timeFrame,
        timeBetweenAlerts,
        timeOutHours,
    } = priceAlert;

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

    return (
        <div>
            <Header />
            <CustomSidebar />
            <Segment style={{ width: sidebar.sidebarOpen ? 1000 : 1200, marginLeft: sidebar.sidebarOpen ? 350 : 150, marginTop: '10%' }} raised>
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
                                <Icon name='info circle' />
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
                                <Icon name='info circle' />
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
                        <p style={{ margin: 0 }}>Direction:</p>
                        <Checkbox label="Cross Above" onChange={() => handleAlertsSelect('high')} checked={alerts.indexOf('high') !== -1} />
                        <Checkbox label="Cross Below" onChange={() => handleAlertsSelect('low')} checked={alerts.indexOf('low') !== -1} />
                        <Checkbox label="Any" onChange={() => handleAlertsSelect('both')} checked={alerts.length === 2} />
                    </div>
                    {
                        activeElement === 'SIGNAL_TYPE' && (
                            <div class="tooltip">
                                <Icon name='info circle' />
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
                        style={{ width: '50%' }}
                        onFocus={() => setActiveElement('TIME_FRAME')}
                        onBlur={() => setActiveElement('')}
                    />
                    {
                        activeElement === 'TIME_FRAME' && (
                            <div class="tooltip">
                                <Icon name='info circle' />
                                <span class="tooltiptext">{FORM_TOOLIPS['TIME_FRAME']}</span>
                            </div>
                        )
                    } 
                </div>
                {/* <div>
                    <p>Timing</p>
                </div>
                <Divider />
                <div css={styles.formContainer}>
                    <Input 
                        fluid 
                        style={{ width: '50%', margin: 10 }}
                        placeholder='Time Between Alerts(in seconds)' 
                        type="number"
                        value={timeBetweenAlerts}
                        onChange={handleTimeIntervalChange}
                        onFocus={() => setActiveElement('TIME_OUT')}
                        onBlur={() => setActiveElement('')}
                    />
                    {
                        activeElement === 'TIME_OUT' && (
                            <div class="tooltip">
                                <Icon name='info circle' />
                                <span class="tooltiptext">{FORM_TOOLIPS['TIME_OUT']}</span>
                            </div>
                        )
                    }
                     <Button.Group onClick={handleTimeOutHoursChange} style={{ width: '50%', margin: 10 }}>
                        <Button inverted={timeOutHours !== 3} value={3} color='blue'>
                            3 Hours
                        </Button>
                        <Button.Or />
                        <Button inverted={timeOutHours !== 6} value={6} color='blue'>
                            6 Hours
                        </Button>
                        <Button.Or />
                        <Button inverted={timeOutHours !== 12} value={12} color='blue'>
                            12 Hours
                        </Button>
                        <Button.Or />
                        <Button inverted={timeOutHours !== 24} value={24} color='blue'>
                            24 Hours
                        </Button>
                    </Button.Group>
                </div> */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
                    <Button 
                         color="blue" 
                         content='Create Alert'
                         onClick={() => createTraderPriceAlerts(priceAlert)}
                    />
                </div>
            </Segment>
        </div>
       
    );
}

const mapStateToProps = (state) => ({
    priceAlert: state.priceAlert,
    sidebar: state.sidebar,
});

export default connect(mapStateToProps)(PriceAlertsForm);
