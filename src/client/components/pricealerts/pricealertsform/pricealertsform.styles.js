import { css } from '@emotion/core';

const styles = {
    formContainer: css`
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        color: #ffffff;
    `,

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


    dropdownContainer: css`
        margin: 10px;
        width: 100%;
    `,

    checkboxContainer: css`
        flex: 1;
        display: flex;
        align-self: flex-start;
        margin: 10px;
    `

};

export default styles;
