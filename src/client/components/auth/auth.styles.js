import { css } from '@emotion/core';

export default {
    container: css`
        display: flex;
        flex: 1;
        width: 100%;
        height: ${window.innerHeight}px;
        justify-content:  center;
        align-items: center;
    `,

    authFormContainer: css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 20px;
    `,

    formElement: css`
        margin: 10px;
        width: 100%;
    `
}