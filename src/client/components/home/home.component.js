import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import RoutesManager from '../../routes';
import AutoSignal from 'components/autosignal/autosignal.component';
import styles from './home.styles';

function Home() {
  return (
    <div>
        <RoutesManager />
    </div>
    
  );
}

export default Home;
