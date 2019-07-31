import { css } from '@emotion/core';

const styles = {
    headerContainer: css`
        display: flex;
        flex: 1;
        height: 72px;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        background: #ffffff;
        z-index: 999;
        align-items: center;
        -webkit-box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.08);
        -moz-box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.08);
        box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.08);
        padding: 20px;
    `,

    titleContainer: css`
        display: flex;
        align-items: center;
        flex: 1;
        justify-content: flex-start;
    `,

    sidebarIcon: css`
        font-size: 20px;
        margin-right: 20px;
    `,

    companyName: css`
        font-size: 38px;
        font-family: sans-serif;
        font-weight: bold;
        margin-left: 20px;
    `
};

export default styles;
