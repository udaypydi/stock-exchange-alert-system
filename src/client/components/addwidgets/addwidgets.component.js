import React, { useState } from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { Icon, Header, Dropdown, Modal, Button } from "semantic-ui-react";
import { AddCurrencyPair } from './addwidgets.api';
import { getUserState } from 'components/home/home.action';
import { CURRENCY_OPTIONS } from './addwidgets.constant';
import "./addwidgets.css";

function AddWidgetModal(props) {
  const [showWidgetsModal, setShowWidgetsModal] = useState(false);
  const [widgetsColor, setWidgetsColor] = useState('');
  const [selectedCurrencyOptions, setSelectedCurrencyOptions] = useState([]);
   
  const { activeGraphs } = props.user;

  function handleClick() {
    setShowWidgetsModal(!showWidgetsModal);
  }

  function generateCurrencyOptions(activeGraphs) {
    const currencyGraphsArray = [];

    const alreadyAddedCurrencyPairs = activeGraphs ? activeGraphs.map(graph => graph.currency) : [];

    CURRENCY_OPTIONS.forEach(currency => {
      if (alreadyAddedCurrencyPairs.indexOf(currency) === -1) {
        currencyGraphsArray.push({
          key: currency,
          name: currency,
          text: currency,
          value: currency,
        });
      }
    });

    return currencyGraphsArray;
  }

  function saveGraphData() {

      const currencyGraphs = selectedCurrencyOptions.map(currency => {
          return {
              currency,
              graphStyle: widgetsColor,
          };
      });

      AddCurrencyPair([
        ...activeGraphs,  
        ...currencyGraphs,
      ]).then(json => {
          const { dispatch } = props;
          setShowWidgetsModal(false);
          dispatch(getUserState());
      });
  }

  return (
    <div className="add-currency-pair">
      <Modal
        trigger={
          <Icon
            style={{ fontSize: props.iconSize || 20 }}
            color="orange"
            name="plus"
            onClick={handleClick}
          />
        }
        style={{
          width: 300
        }}
        open={showWidgetsModal}
        closeIcon
        dimmer
        closeOnDimmerClick
        onClose={handleClick}
      >
        <Modal.Header>Add a currency pair</Modal.Header>
        <Modal.Content image>
          <Modal.Description
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Header style={{ alignSelf: "flex-start" }}>
              Select a graph color
            </Header>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  height: 50,
                  width: 50,
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  cursor: "pointer",
                  borderColor: widgetsColor === 'GRAPH_0' ? '#048fde' : '#ccc',
                }}
                onClick={() => setWidgetsColor('GRAPH_0')}
                className={"graph-00"}
              />
              <div
                style={{
                  height: 50,
                  width: 50,
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  marginLeft: 5,
                  cursor: "pointer",
                  borderColor: widgetsColor === 'GRAPH_1' ? '#048fde' : '#ccc',
                }}
                onClick={() => setWidgetsColor('GRAPH_1')}
                className={"graph-01"}
              />
              <div
                style={{
                  height: 50,
                  width: 50,
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  marginLeft: 5,
                  cursor: "pointer",
                  borderColor: widgetsColor === 'GRAPH_2' ? '#048fde' : '#ccc',
                }}
                onClick={() => setWidgetsColor('GRAPH_2')}
                className={"graph-02"}
              />
              <div
                style={{
                  height: 50,
                  width: 50,
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  marginLeft: 5,
                  cursor: "pointer",
                  borderColor: widgetsColor === 'GRAPH_3' ? '#048fde' : '#ccc',
                }}
                onClick={() => setWidgetsColor('GRAPH_3')}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <p
                    style={{
                      borderRadius: "50%",
                      border: "1px solid blue",
                      backgroundColor: "yellow",
                      height: 10,
                      width: 10,
                      marginTop: 15
                    }}
                  />
                  <p style={{ color: "blue", margin: 0 }}>----</p>
                  <p
                    style={{
                      borderRadius: "50%",
                      border: "1px solid blue",
                      backgroundColor: "yellow",
                      height: 10,
                      width: 10
                    }}
                  />
                </div>
              </div>
            </div>
            <Dropdown
              multiple
              selection
              placeholder="Select currency pair"
              options={generateCurrencyOptions(activeGraphs)}
              style={{ marginTop: 20, width: 250 }}
              onChange={(event, data) => {
                  setSelectedCurrencyOptions(data.value);
              }}
            />
            <div style={{ display: "flex", marginTop: 20 }}>
              <Button 
                inverted 
                color="blue" 
                style={{ width: 100 }}
                onClick={saveGraphData}
            >
                Save
              </Button>
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(AddWidgetModal);
