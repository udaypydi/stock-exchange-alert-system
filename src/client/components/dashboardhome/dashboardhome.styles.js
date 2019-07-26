import { css } from '@emotion/core';

const styles = {
    chartData: css`
        flex: 1;
        width: 300px;
        display: flex;
        justify-content: space-evenly;
        position: absolute;
        top: 0;
    `,

    chartCard: css`
        display: flex;
        width: 300px;
        height: 180px;
        position: relative;
        border-radius: 10px;
        justify-content: center;
        align-items: center;
        border: 1px outset #999;
        -webkit-box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.4);
        -moz-box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.4);
    `,

    chartsContainer: css`
        display: flex;
        flex: 1;
        justify-content: space-evenly;
        margin-left: 180px;
        margin-top: 150px;
    `
};

export default styles;
