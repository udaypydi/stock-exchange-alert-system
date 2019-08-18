import React from 'react';
import { Input, Divider } from 'semantic-ui-react';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import { mailTitleChange, mailMessageChange } from './mailconfiguration.action';
import styles from './mailconfiguration.styles';

function MailConfiguration(props) {

    const { signalMail, dispatch} = props;
    const { title, message } = signalMail;

    function handleMailTitleChange(event) {
        dispatch(mailTitleChange(event.target.value));
    }
 
    function handleMailMessageChange(event) {
        dispatch(mailMessageChange(event.target.value));
    }

    return (
        <div>
            <div style={{ marginTop: 20 }}> 
                    <p>General Properties</p>
            </div>
            <Divider />
            <div css={styles.formContainer}>
                <Input 
                    fluid 
                    style={{ width: '90%', margin: 10 }}
                    placeholder='Title of the mail' 
                    value={title}
                    onChange={handleMailTitleChange}
                />  
            </div>
            <div css={styles.formContainer}>
                <textarea 
                    placeholder="Alert Message"
                    value={message}
                    onInput={handleMailMessageChange}
                    style={{ 
                        height: 50, 
                        maxWidth: '90%', 
                        width: '90%',
                        minWidth: '90%',
                        borderColor: '#cccccc',
                        borderRadius: 5,
                        paddingLeft: 10,
                    }} 
                />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    signalMail: state.signalMail,
});

export default connect(mapStateToProps)(MailConfiguration);
