export const SIDEBAR_MENU  = [
    {
        name: 'Dashboard',
        iconName: 'dashboard',
        route: '/home',
    },
    {
        name: 'Indicator Signals',
        iconName: 'line graph',
        route: '/auto-signals'
    },
    {
        name: 'Follow Experts',
        iconName: 'area graph',
        route: '/follow-experts',
    },
    {
        name: 'Alert History',
        iconName: 'chart line',
        route: '/alerts-history',
    },
    {
        name: 'Profile',
        iconName: 'user circle',
        route: '/my-profile',
    },
];

export const DASHBOARD_ROUTE = ['#/home', '#/auto-signals', '#/follow-experts', '#/alerts-history', '#/my-profile'];

export const SIDEBAR_HEADER = 'Signalant';

// reducer constants

export const SIDEBAR_TOGGLE_STATUS = 'SIDEBAR_TOGGLE_STATUS';


export const SIDEBAR_INIT_STATE = {
    sidebarOpen: true,
};
