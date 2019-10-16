import React, { useState } from 'react';
import { Grid, Segment, Input, Checkbox, Button, Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Helmet } from "react-helmet";
  /** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import { signInUser } from './auth.action';
import { forgotPassword, validateOTP, resetPassword } from './auth.api';

import styles from './auth.styles';

function Auth(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOTP] = useState('');
    const [showErrors, setShowErrors] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showPasswordField, setShowPasswordField] = useState(false);
    const [showPasswordOTPField, setShowPasswordOTPField] = useState(false);
    const [newPassword, setNewPassword] = useState('');
     
    const { user } = props;

    function logInUser() {
        const { dispatch } = props;
        const userData = {
            email,
            password,
        };

        if (email && password) {
            dispatch(signInUser(userData));
        } else {
            setShowErrors(true);
        }
    }

    function handleForgotPassword() {
        setShowForgotPassword(true);
        setEmail('');
    }

    function validateEmail(emailField){
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (reg.test(emailField) == false) 
        {
            return false;
        }

        return true;

    }

    function handleSendOTP() {
        if (validateEmail(email)) {
            forgotPassword(email)
                .then(json => {
                    if (json.status === 200) {
                        setShowPasswordOTPField(true);
                        setShowErrors(false);
                    }
                })
        } else {
            setShowErrors(true);
        }
    }

    function handleVerifyOTP() {
        if (email && otp) {
            validateOTP({ email, otp })
                .then(json => {
                    if (json.isValid) {
                        setShowPasswordOTPField(false);
                        setShowPasswordField(true);
                        setShowErrors(false);
                    }
                })
        } else {
            setShowErrors(true);
        }
    }

    function handleResetPassword() {
        if (email && newPassword) {
            resetPassword({ email, password: newPassword })
                .then(json => {
                    if (json.passwordReset) {
                        props.history.push('/home');
                    }
                })
        } else {
            setShowErrors(false);
        }
    }

    return (
        <div css={styles.container}>
             <Helmet>
                <meta charSet="utf-8" />
                <title>Signalant - Sign In</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <Segment 
                style={{ 
                    width: '60%', 
                    height: 300, 
                    borderRadius: 10, 
                    backgroundColor: '#ffffff' 
                }} 
                raised
            >
                <Grid>
                    <Grid.Row style={{ padding: 0 }}>
                        <Grid.Column computer={8} mobile={16} style={{ padding: 0 }}>
                            <div style={{ position: 'absolute' }}>
                                <img 
                                    src="http://content.didimax.co.id/Upload/2019/01/02/zcvERBwM/20190102162843478.jpg" 
                                    height="300" 
                                    style={{ width: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} 
                                />
                            </div>
                            <div 
                                style={{ 
                                    color: '#ffffff', 
                                    position: 'relative', 
                                    height: 300, 
                                    width: '100%', 
                                    backgroundColor: 'rgba(3, 143, 222, 0.7)',
                                    paddingLeft: 30,
                                    paddingTop: 20,
                                    borderTopLeftRadius: 10, 
                                    borderBottomLeftRadius: 10
                                }}
                            >
                               <h1>Sign In</h1>
                               <p style={{ fontSize: 16 }}>By Signing Up, you can avail full features of our services.</p>
                               <p style={{ fontSize: 16, marginTop: 20 }}>Get an account today.</p> 
                               <img 
                                    src="https://res.cloudinary.com/dgvup74b7/image/upload/v1565302530/h6auuysxte0jayf1ro9t.png" 
                                    style={{ height: 40, marginTop: 40 }} 
                                />
                            </div>
                        </Grid.Column>
                        <Grid.Column computer={8} mobile={16}>
                            <div css={styles.authFormContainer}>
                                {
                                    !showForgotPassword ? (
                                        <React.Fragment>
                                            <div css={styles.formElement}>
                                                <Input 
                                                    placeholder="Email" 
                                                    style={{ width: '80%' }}
                                                    value={email}
                                                    onChange={(event) => { setEmail(event.target.value) }}
                                                    error={showErrors && !email}
                                                />
                                            </div>
                                            <div css={styles.formElement}>
                                                <Input 
                                                    type="password" 
                                                    placeholder="Password" 
                                                    style={{ width: '80%' }} 
                                                    value={password}
                                                    onChange={(event) => { setPassword(event.target.value) }}
                                                    error={showErrors && !password}
                                                />
                                            </div> 
                                            <div>
                                                <p 
                                                    css={styles.signUpText}
                                                    onClick={handleForgotPassword}
                                                >Forgot Password?</p>
                                            </div>
                                            {user.userLoginError !== 'Logged in succesfully' && (<p style={{ color: 'red' }}>{user.userLoginError}</p>)}
                                            <div css={styles.formElement}>
                                                <Button onClick={logInUser}primary>Sign In</Button>
                                                <label style={{ marginLeft: 10 }}>or</label>
                                                <label css={styles.signUpText} onClick={() => props.history.push('/sign-up')}>Sign Up</label>
                                            </div>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <div css={styles.formElement}>
                                                <Input 
                                                    placeholder="Email" 
                                                    style={{ width: '80%' }}
                                                    value={email}
                                                    onChange={(event) => { setEmail(event.target.value) }}
                                                    error={showErrors && !email}
                                                />
                                            </div>
                                            {
                                                showPasswordOTPField && (
                                                    <div css={styles.formElement}>
                                                        <Input 
                                                            placeholder="OTP" 
                                                            style={{ width: '80%' }}
                                                            value={otp}
                                                            onChange={(event) => { setOTP(event.target.value) }}
                                                            error={showErrors && !otp}
                                                        />
                                                    </div>
                                                )
                                            }
                                            {
                                                    showPasswordField && (
                                                        <React.Fragment>
                                                            <div css={styles.formElement}>
                                                                <Input 
                                                                    placeholder="New Password" 
                                                                    style={{ width: '80%' }}
                                                                    value={newPassword}
                                                                    onChange={(event) => { setNewPassword(event.target.value) }}
                                                                    error={showErrors && !newPassword}
                                                                />
                                                            </div>
                                                        </React.Fragment>    
                                                    )
                                            }
                                            <div css={styles.formElement}>
                                                {
                                                    showForgotPassword && !showPasswordOTPField && !showPasswordField && (
                                                        <Button onClick={handleSendOTP} primary>Send OTP</Button>
                                                    ) 
                                                }
                                                {
                                                     showForgotPassword && showPasswordOTPField && !showPasswordField && (
                                                        (
                                                            <Button onClick={handleVerifyOTP} primary>Verify OTP</Button>
                                                        )
                                                    )
                                                }

                                                {
                                                     showForgotPassword && !showPasswordOTPField && showPasswordField  && (
                                                        <Button onClick={handleResetPassword} primary>Reset Password</Button>
                                                    )
                                                }
                                            
                                                <label style={{ marginLeft: 10 }}>or</label>
                                                <label css={styles.signUpText} onClick={() => {
                                                    setShowForgotPassword(false);
                                                    setShowErrors(false);
                                                }}>Sign In</label>
                                            </div>
                                        </React.Fragment>
                                    )
                                }
                            </div>  
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </div>
    )
} 


const mapStateToProps = state => ({
    user: state.user,
});

export default withRouter(connect(mapStateToProps)(Auth));
