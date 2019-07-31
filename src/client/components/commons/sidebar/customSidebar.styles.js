import { css } from '@emotion/core';

const styles = {

    sidebarContainer: css`
        background: #000000;
    `,

    sidebarHeader: css`
        font-size: 30px;
        color: #000000;
    `,

    menuItem: css`
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #545454;
        font-size: 14px;
        &:hover {
            color: #2185d0;
            background: #ffffff;
        }
    `,

    activeMenuItem: css`
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #545454;
        font-size: 14px;
        background: #e6faff;
        &:hover {
            color: #2185d0;
        }
    `
};


export default styles;
