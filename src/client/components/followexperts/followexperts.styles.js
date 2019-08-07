import { css } from '@emotion/core';

const styles = {
    container: css`
        display: flex;
        flex: 1;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        margin-top: 7%;
        margin-left: 5%;
    `,

    header: css`
        display: flex;
        width: 100%;
        justify-content: space-around;
        align-items: center;
    `,

    title: css`
        font-size: 20px;
        margin-bottom: 0;
    `,

    cardImage: css`
        width: 100%;
        height: 170px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    `,

    nameContainer: css`
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    `,

    followProfileContainer: css`
        width: 300px;
        display: flex;
        justify-content: flex-end;
        height: 35px;
        margin-right: 20px;
    `,

    dataContainer: css`
        display: flex;
        justify-content: center;
        margin-top: 20px;
        margin-bottom: 20px;
    `,

    stats: css`
        text-align: center;
        padding-left: 10px;
        padding-right: 20px;
        border-right: 1px solid #ccc;
    `,

    statTitle: css`
        margin: 0;
        font-size: 14;
        color: #262626;
        font-weight: bold;
    `,
    profileImage: css`

    `
};

export default styles;
