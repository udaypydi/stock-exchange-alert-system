import React, { useState } from 'react';
import { Grid, Segment, Input, Checkbox, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
  /** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import { updateUserState, getUserState } from 'components/home/home.action';
import { userSignUp } from '../auth.api';
import styles from './signup.styles';

function SignUp(props) {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [countryCode, setCountryCode] = useState('IN');
    const [password, setPassword] = useState('');
    const [showErrors, setShowErrors] = useState(false);

    function signupUser() {
        const { dispatch, history } = props; 
        const data = {
            userName,
            email,
            countryCode,
            password,
        };

        if (
            userName
            && email
            && countryCode
            && password
        ) {
            userSignUp(data)
            .then(json => {
                if (json.isRegistered) {
                    updateUserState(json);
                    dispatch(getUserState());
                    history.push('/home');
                } else if(!json.isRegistered && json.message === 'Email already in use') {
                    setShowErrors(true)
                }
            });
        } else {
            setShowErrors(true);
        }
    }
    
    return (
        <div css={styles.container}>
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
                               <h1>Sign In</h1>
                               <p style={{ fontSize: 16 }}>By Signing Up, you can avail full features of our services.</p>
                               <p style={{ fontSize: 16, marginTop: 20 }}>Get an account!!!</p> 
                               <img 
                                    src="https://res.cloudinary.com/dgvup74b7/image/upload/v1565302530/h6auuysxte0jayf1ro9t.png" 
                                    style={{ height: 40, marginTop: 140 }} 
                                />
                            </div>
                        </Grid.Column>
                        <Grid.Column computer={10} mobile={16}>
                            <div css={styles.authFormContainer}>
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
                                {
                                    showErrors && password && email && (
                                        <p style={{ color: 'red' }}>Email already exist</p>
                                    )
                                }
                                <div css={styles.formElement}>
                                    <Checkbox label="by signing up, I accept Term & Condition" />
                                </div>             
                                <div css={styles.formElement}>
                                    <Button onClick={signupUser}primary>Sign Up</Button>
                                </div>
                            </div>  
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </div>
     
    )
} 

export default withRouter(connect()(SignUp));
