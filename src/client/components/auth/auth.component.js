import React, { useState } from 'react';
import { Grid, Segment, Input, Checkbox, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
  /** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import { signInUser } from './auth.action';
import styles from './auth.styles';

function Auth(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function logInUser() {
        const { dispatch } = props;
        const userData = {
            email,
            password,
        };

        dispatch(signInUser(userData));
    }

    return (
        <div css={styles.container}>
            <Segment style={{ width: '60%', height: 300, borderRadius: 10, backgroundColor: '#ffffff' }} raised>
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
                               <p style={{ fontSize: 16, marginTop: 20 }}>Get an account!!!</p> 
                               <img 
                                    src="https://res.cloudinary.com/dgvup74b7/image/upload/v1565302530/h6auuysxte0jayf1ro9t.png" 
                                    style={{ height: 40, marginTop: 40 }} 
                                />
                            </div>
                        </Grid.Column>
                        <Grid.Column computer={8} mobile={16}>
                            <div css={styles.authFormContainer}>
                                <div css={styles.formElement}>
                                    <Input 
                                        placeholder="Email" 
                                        style={{ width: '80%' }}
                                        onChange={(event) => { setEmail(event.target.value) }}
                                    />
                                </div>
                                <div css={styles.formElement}>
                                    <Input 
                                        type="password" 
                                        placeholder="Password" 
                                        style={{ width: '80%' }} 
                                        onChange={(event) => { setPassword(event.target.value) }}
                                    />
                                </div> 
                                <div css={styles.formElement}>
                                    <Button onClick={logInUser}primary>Sign In</Button>
                                    <label style={{ marginLeft: 10 }}>or</label>
                                    <label css={styles.signUpText} onClick={() => props.history.push('/sign-up')}>Sign Up</label>
                                </div>
                            </div>  
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </div>
     
    )
} 

export default withRouter(connect()(Auth));
