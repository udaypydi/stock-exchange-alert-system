import { css } from '@emotion/core';

const styles = {
    container: css`
        display: flex;
        flex: 1;
        align-items: center;
        margin: 10px;
        width: 80%;
        margin-left: 65%;
        transform: translate(-50%, 0);
        height: 100%;
        margin-top: 7%;
    `,

    headerContainer: css`
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
        margin: 10px;
    `,

    signalsHeaderContainer: css`
        display: flex;
        flex: 1;
        justify-content: space-evenly;
    `,

    signalPaginationButtons: css`
        padding: 2px 7px 2px 7px;
        border: 1px solid #ccc;
        font-size: 18px;
        margin-left: 4px;
        border-radius: 2px;
        height: 31px;
    `,

    autoSignalCell: css`
        width: 120px;
        text-align: center;
    `
}

export default styles;
