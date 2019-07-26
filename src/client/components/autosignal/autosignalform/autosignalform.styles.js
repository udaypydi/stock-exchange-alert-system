import { css } from '@emotion/core';

const styles = {
    formContainer: css`
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
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
    `

};

export default styles;
