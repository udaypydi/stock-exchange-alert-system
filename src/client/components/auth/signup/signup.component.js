import React, { useState, useEffect } from 'react';
import { Grid, Segment, Input, Checkbox, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import ReactFlagsSelect from 'react-flags-select';
import { Helmet } from "react-helmet";
import 'react-flags-select/css/react-flags-select.css';
  /** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import { updateUserState, getUserState } from 'components/home/home.action';
import { userSignUp, generateOTP, validateOTP } from '../auth.api';
import styles from './signup.styles';

function SignUp(props) {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [password, setPassword] = useState('');
    const [showErrors, setShowErrors] = useState(false);
    const [showEmailInvalid, setShowEmailInvalid] = useState(false);
    const [showOTPVerificationFiled, setShowOTPVerificationFiled] = useState(false);
    const [otp, setOTP] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const countryFlags = React.createRef();

    useEffect(() => {
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(json => {
                if (countryFlags.current) {
                    countryFlags.current.updateSelected(json.country);
                    setCountryCode(json.country);
                }
            });
    });

    function validateEmail(emailField){
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (reg.test(emailField) == false) 
        {
            return false;
        }

        return true;

    }

    function signupUser() {
        const { dispatch, history } = props; 
        const data = {
            userName,
            email,
            countryCode,
            password,
        };
        const isEmailValid = validateEmail(email);
        if (
            userName
            && email
            && countryCode
            && password
            && isEmailValid
        ) {

            generateOTP(data)
                .then(res => {
                    if (res.isSuccessfull) {
                        setShowOTPVerificationFiled(true);
                        setShowErrors(false);
                    } 
                    
                    if(res.userAlreadyExist) {
                        setShowErrors(true);
                        setErrorMessage('User Already Exist.');
                    }
                });
        } else {
            if (email && password && userName) {
                setShowEmailInvalid(true);
                setErrorMessage('Please enter a valid email.');
            } else {
                setShowErrors(true);
                setErrorMessage('Please fill all the fields');
            }
            
        }
    }

    function renderErrorFields() {
        if (!showEmailInvalid) {
            if (showErrors && (!password || !email || !userName)) {
                return (
                    <p style={{ color: 'red' }}>{errorMessage}</p>
                )
            }
    
            if (showErrors && (password && email && userName)) {
                return (
                    <p style={{ color: 'red' }}>{errorMessage}</p>
                )
            }
        } else {
            return (
                <p style={{ color: 'red' }}>{errorMessage}</p>
            )
        }
     
        return null;
    } 


    const verifyOTP = () => {
        if (!otp || otp.length !== 4) {
            setShowErrors(true);
            setErrorMessage('Invalid OTP');
        } else {
            const { dispatch, history } = props; 
            const data = {
                userName,
                email,
                countryCode,
                password,
            };
            validateOTP({
                email,
                otp: parseInt(otp),
            }).then((res) => {
                if (res.isValid) {
                    userSignUp(data)
                    .then(json => {
                        if (json.isRegistered) {
                            updateUserState(json);
                            dispatch(getUserState());
                            history.push('/home');
                        }
                    });
                } else {
                    setShowErrors(true);
                    setErrorMessage('Invalid OTP');
                }
            })
        }
    }

    return (
        <div css={styles.container}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Signalant - Sign Up</title>
            </Helmet>
            <Segment style={{ width: '60%', height: 500, borderRadius: 10, backgroundColor: '#ffffff' }} raised>
                <Grid>
                    <Grid.Row style={{ padding: 0 }}>
                        <Grid.Column computer={6} mobile={16} style={{ padding: 0 }}>
                            <div style={{ position: 'absolute' }}>
                                <img 
                                    src="http://content.didimax.co.id/Upload/2019/01/02/zcvERBwM/20190102162843478.jpg" 
                                    height="500" 
                                    style={{ width: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} 
                                />
                            </div>
                            <div 
                                style={{ 
                                    color: '#ffffff', 
                                    position: 'relative', 
                                    height: 500, 
                                    width: '100%', 
                                    backgroundColor: 'rgba(3, 143, 222, 0.7)',
                                    paddingLeft: 30,
                                    paddingTop: 20,
                                    borderTopLeftRadius: 10, 
                                    borderBottomLeftRadius: 10
                                }}
                            >
                               <h1>Sign Up</h1>
                               <p style={{ fontSize: 16 }}>By Signing Up, you can avail full features of our services.</p>
                               <p style={{ fontSize: 16, marginTop: 20 }}>Already have an account? <a href="#/sign-in" style={{ color: '#fff', textDecoration: 'underline', pointer: 'cursor' }}>Sign In</a></p> 
                               <img 
                                    src="https://res.cloudinary.com/dgvup74b7/image/upload/v1565302530/h6auuysxte0jayf1ro9t.png" 
                                    style={{ height: 40, marginTop: 140 }} 
                                />
                            </div>
                        </Grid.Column>
                        <Grid.Column computer={10} mobile={16}>
                            <div css={styles.authFormContainer}>
                                {
                                    !showOTPVerificationFiled ? (
                                        <React.Fragment>
                                            <div css={styles.formElement}>
                                                <Input 
                                                    placeholder="Name" 
                                                    style={{ width: '80%' }}
                                                    value={userName}
                                                    error={showErrors && !userName}
                                                    onChange={(event) => { setUserName(event.target.value) }}
                                                />
                                            </div>
                                            <div css={styles.formElement}>
                                                <Input 
                                                    placeholder="Email" 
                                                    style={{ width: '80%' }}
                                                    value={email}
                                                    error={showErrors && !email}
                                                    onChange={(event) => { setEmail(event.target.value) }}
                                                />
                                            </div>
                                            <div css={styles.formElement}>
                                            <ReactFlagsSelect
                                                    defaultCountry={countryCode} 
                                                    ref={countryFlags}
                                                    searchPlaceholder="Search for a country"
                                                    onSelect={(countryCode) => { setCountryCode(countryCode) }}
                                                    style={{ width: '80%' }}
                                                />
                                            </div>
                                            <div css={styles.formElement}>
                                                <Input 
                                                    placeholder="Password" 
                                                    style={{ width: '80%' }}
                                                    type="password"
                                                    value={password}
                                                    error={showErrors && !password}
                                                    onChange={(event) => { setPassword(event.target.value) }}
                                                />
                                            </div>
                                            {renderErrorFields()}
                                            <div css={styles.formElement}>
                                                <Checkbox label={<label>By signing up, I accept the <a href="/#/terms-and-conditions">Terms & Conditions.</a></label>}/>
                                            </div>             
                                            <div css={styles.formElement}>
                                                <Button onClick={signupUser}primary>Sign Up</Button>
                                            </div>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment style={{ textAlign: 'center' }}>
                                              <h1>Verification Code</h1>
                                              <h3>Please type the verification code sent to **********{email.substring(email.length / 2, email.length)}</h3>
                                              <div css={styles.formElement}>
                                                    <Input 
                                                        placeholder="Enter OTP" 
                                                        style={{ width: '40%', textAlign: 'center', fontWeight: 'bold' }}
                                                        value={otp}
                                                        error={showErrors && otp.length !== 4}
                                                        type="number"
                                                        onChange={(event) => { setOTP(event.target.value) }}
                                                    />
                                                      {renderErrorFields()}
                                                    <Button onClick={verifyOTP} style={{ marginLeft: 20 }} primary>Verify</Button>
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

export default withRouter(connect()(SignUp));
