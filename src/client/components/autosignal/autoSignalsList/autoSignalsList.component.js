import React, { useEffect } from 'react';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchAllAutoSignals } from './autoSignalsList.action';

function AutoSignalsList(props) {

    const { autoSignalsList } = props;

    useEffect(() => {
        const { dispatch } = props;
        dispatch(fetchAllAutoSignals());
    }, []);

    return (
        <div style={{ marginTop: 30 }}>
            {
                autoSignalsList && autoSignalsList.signalsList.map((signal) => (
                    <Segment basic style={{ border: '1px solid #ccc' }}> 
                        {signal.signalName}
                    </Segment>
                ))
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    autoSignalsList: state.autoSignalsList,
});

export default connect(mapStateToProps)(AutoSignalsList);
