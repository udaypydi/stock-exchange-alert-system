import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import IndicatorAlerts from './mobilealerts/indicatoralerthistory.component';
import ExpertAlertsMobile from './mobilealerts/expertalerthistory.component';
import PriceAlerts from './mobilealerts/pricealertshistory.mobile.component';

function AlertHistoryMobile(props) {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
      <div style={{ overflow: 'hidden' }}>
        <Segment
          style={{
            display: "flex",
            flex: 1,
            width: 390,
            padding: 0,
            height: 40,
            margin: 'auto'
          }}
          raised
        >
          <div
            style={{
              display: "flex",
              width: 130,
              borderRight: "1px solid #ccc",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: activeIndex === 0 ? "#048fde" : "transparent",
              color: activeIndex === 0 ? "#ffffff" : "black"
            }}
            onClick={() => setActiveIndex(0)}
          >
            <p>Indicator Alerts</p>
          </div>
          <div
            style={{
              display: "flex",
              width: 130,
              borderRight: "1px solid #ccc",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: activeIndex === 1 ? "#048fde" : "transparent",
              color: activeIndex === 1 ? "#ffffff" : "black"
            }}
            onClick={() => setActiveIndex(1)}
          >
            <p>Expert Alerts</p>
          </div>
          <div
            style={{
              display: "flex",
              width: 130,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: activeIndex === 2 ? "#048fde" : "transparent",
              color: activeIndex === 2 ? "#ffffff" : "black"
            }}
            onClick={() => setActiveIndex(2)}
          >
            <p>Price Alerts</p>
          </div>
        </Segment>
        {
            activeIndex === 0 && (
                <IndicatorAlerts />
            )
        }
        {
            activeIndex === 1 && (
                <ExpertAlertsMobile />
            )
        }
        {
            activeIndex === 2 && (
                <PriceAlerts />
            )
        }
      </div>
    );
}

export default AlertHistoryMobile;
