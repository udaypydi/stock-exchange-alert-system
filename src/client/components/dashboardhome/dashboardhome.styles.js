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
        padding-top: 120px;
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
    `,

    statsContainer: css`
        justify-content: center;
        display: flex;
        align-items: center;
        flex-direction: column;
        border-bottom: 1px solid #565e84;
        padding-top: 10px;
        padding-bottom: 10px;
    `,

    statsCount: css`
        margin-bottom: 0;
        font-size: 30px;
        color: #9c9fa6 ;
        margin-bottom: 10px;
        margin-top: 10px;
    `,

    statsTitle: css`
        color: #9c9fa6 ;
        font-size: 20px;
        font-weight: bold;
    `
};

export default styles;
