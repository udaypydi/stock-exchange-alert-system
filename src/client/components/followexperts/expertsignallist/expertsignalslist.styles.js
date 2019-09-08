import { css } from '@emotion/core';

const styles = {
    signalsHeaderContainer: css`
        display: flex;
        flex: 1;
        justify-content: space-evenly;
    `,

    statusButton: css`
        background: green;
        color: #ffffff;
        width: 80px;
        padding: 2px 15px 2px 15px;
        height: 25px;
    `,

    autoSignalCell: css`
        width: 20%;
        text-align: center;
        /* align-items: center; */
        display: flex;
        justify-content: center;
        color: #9c9fa6;
    `
};

export default styles;
