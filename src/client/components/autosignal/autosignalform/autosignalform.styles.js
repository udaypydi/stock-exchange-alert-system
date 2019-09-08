import { css } from '@emotion/core';

const styles = {
    formContainer: css`
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
    `,

    container: css`
        display: flex;
        flex: 1;
        align-items: center;
        margin: 10px;
        width: 80%;
        margin-left: 65%;
        margin-top: 7%;
        transform: translate(-50%, 0);
        height: 100%;
    `,


    dropdownContainer: css`
        margin: 10px;
    `,

    dateContainer: css`
        display: flex;
        flex: 1;
        justify-content: space-between;
        align-items: center;
        margin: 10px;  
    `,

    datePickerComponent: css`
        padding: 10px;
        border: 1px solid #ccc;
    `,

    checkboxContainer: css`
        flex: 1;
        display: flex;
        align-self: flex-start;
        margin: 10px;
    `,

    customInput: css`
        background-color: #2b2e4c;
        margin: 0;
        padding: 10px;
        border: 0;
        color: #ffffff;
    `

};

export default styles;
