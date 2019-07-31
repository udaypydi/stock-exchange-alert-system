import { css } from '@emotion/core';

const styles = {
    container: css`
        display: flex;
        flex: 1;
        align-items: center;
        margin: 10px;
        width: 80%;
        margin-left: 65%;
        margin-top: 10%;
        transform: translate(-50%, 0);
        height: 100%;
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
    `
}

export default styles;
