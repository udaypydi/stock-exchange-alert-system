import { css } from '@emotion/core';

const styles = {
    container: css`
        background-image: linear-gradient(to right top, #072c64, #114484, #175ea6, #187ac8, #1297eb);
        color: #ffffff;
        width: 100%;
        height: 250px;
    ` ,

    imageContainer: css`
        padding: 20px;
        display: flex;
        flex: 1;
        align-items: center;
        margin-left: 300px;
    `,

    traderName: css`
        margin-left: 20px;
        font-size: 21px;
        font-weight: 400;
    `
};

export default styles;
