import { SIDEBAR_TOGGLE_STATUS, MOBILE_SIDEBAR_TOGGLE_STATUS } from './customSideBar.constant';

export function sideBarToggleStatus() {
    return {
        type: SIDEBAR_TOGGLE_STATUS,
    };
};

export function mobileSidebarToggleStatus() {
    return {
        type: MOBILE_SIDEBAR_TOGGLE_STATUS,
    };
}
