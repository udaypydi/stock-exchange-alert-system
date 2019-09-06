import { css } from '@emotion/core';

const styles = {

    sidebarContainer: css`
        background: #000000;
        z-index: 99999;
    `,

    sidebarHeader: css`
        font-size: 30px;
        color: #b1b1b5;
    `,

    menuItem: css`
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #545454;
        font-size: 14px;
        &:hover {
            color: #b1b1b5;
        }
    `,

    activeMenuItem: css`
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #b1b1b5;
        font-size: 14px;
        &:hover {
            color: #b1b1b5;
        }
    `,

    profileImageContainer: css`
        height: 120px;
        width: 100%;
        background: #131633;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    `,

    profileType: css`
        padding: 10px;
        color: #b1b1b5;
        font-weight: 400;
    `,
};


export default styles;
