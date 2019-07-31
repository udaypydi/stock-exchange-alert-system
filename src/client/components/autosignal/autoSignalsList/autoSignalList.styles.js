import { css } from '@emotion/core';

const styles = {
    signalsHeaderContainer: css`
        display: flex;
        flex: 1;
        justify-content: space-evenly;
    `,

    statusButton: css`
        border: 1px solid #038fde;
        color: #038fde;
        border-radius: 5px;
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
    `
};

export default styles;
