import React from 'react';
import { Grid, Segment, Input, Checkbox, Button } from 'semantic-ui-react';
  /** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import { signInUser } from './auth.action';
import styles from './auth.styles';

function Auth(props) {

    function logInUser() {
        const { dispatch } = props;
        dispatch(signInUser());
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
                                    src="https://res.cloudinary.com/dgvup74b7/image/upload/v1564828194/White_sndtyk.png" 
                                    style={{ height: 40, marginTop: 40 }} 
                                />
                            </div>
                        </Grid.Column>
                        <Grid.Column computer={8} mobile={16}>
                            <div css={styles.authFormContainer}>
                                <div css={styles.formElement}>
                                    <Input placeholder="Email" style={{ width: '80%' }} />
                                </div>
                                <div css={styles.formElement}>
                                    <Input placeholder="Password" style={{ width: '80%' }} />
                                </div>
                                <div css={styles.formElement}>
                                    <Checkbox label="by signing up, I accept"/>
                                    <label>Term & Condition</label>
                                </div>
                                
                                <div css={styles.formElement}>
                                    <Button onClick={logInUser}primary>Sign In</Button>
                                    <label>or</label>
                                    <label>Sign Up</label>
                                </div>
                            </div>  
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </div>
     
    )
} 

export default connect()(Auth);
