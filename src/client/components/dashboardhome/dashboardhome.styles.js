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
        margin-top: 0;
        border: 1px solid #313452;
    `,

    alertGraphCard: css`
        display: flex;
        width: 250px;
        height: 140px;
        position: relative;
        justify-content: center;
        align-items: center;
        filter: blur(8px);
        -webkit-filter: blur(8px);
        border: 1px solid #313452;
    `,

    chartsContainer: css`
        display: flex;
        flex: 1;
        justify-content: flex-start;
        padding-top: 160px;
        padding-left: 290px;
        flex-wrap: wrap;
    `,
    mobileChartContainer: css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 120px;
    `,
    container: css`
        width: 100%;
        background: #222840;
    `,
    deleteIcon: css`
        display: none;
    `
};

export default styles;
