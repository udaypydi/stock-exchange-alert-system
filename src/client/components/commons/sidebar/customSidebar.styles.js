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
        justify-content: space-between;
        align-items: center;
        color: #545454;
        font-size: 14px;
        height: 50px;
        padding-left: 20px;
        padding-right: 20px;
        &:hover {
            background: #191e3c;
            color: #d0cfcf;
        }
    `,

    activeMenuItem: css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #d0cfcf;
        font-size: 14px;
        height: 50px;
        background: #191e3c;
        padding-left: 20px;
        padding-right: 20px;
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
