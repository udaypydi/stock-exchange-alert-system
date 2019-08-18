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
        height: 140px;
        position: relative;
        justify-content: center;
        align-items: center;
        -webkit-box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.03);
        -moz-box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.03);
        box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.03);
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        margin-top: 0;
    `,

    alertGraphCard: css`
        display: flex;
        width: 250px;
        height: 140px;
        position: relative;
        justify-content: center;
        align-items: center;
        -webkit-box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.03);
        -moz-box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.03);
        box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.03);
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        margin-top: 0;
        filter: blur(8px);
        -webkit-filter: blur(8px);
    `,

    chartsContainer: css`
        display: flex;
        flex: 1;
        justify-content: space-evenly;
        padding-top: 160px;
        padding-left: 280px;
    `,
    mobileChartContainer: css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 100px;
    `,
    container: css`
        width: 100%;
        background: #f5f5f5;
    `
};

export default styles;
