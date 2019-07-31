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
        width: 250px;
        height: 150px;
        position: relative;
        border-radius: 10px;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        margin-top: 0;
    `,

    chartsContainer: css`
        display: flex;
        flex: 1;
        justify-content: space-evenly;
        padding-top: 160px;
        height: ${window.availHeight}px;
        padding-left: 280px;
    `,
    container: css`
        height:  ${window.outerHeight}px;
        width: 100%;
        background: #f0f2f5;
    `
};

export default styles;
