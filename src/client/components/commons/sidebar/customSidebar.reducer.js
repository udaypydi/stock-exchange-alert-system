import { SIDEBAR_TOGGLE_STATUS, SIDEBAR_INIT_STATE } from './customSidebar.constant';

export default function sidebarReducer(state = SIDEBAR_INIT_STATE, action) {
    switch(action.type) {
        case SIDEBAR_TOGGLE_STATUS:
            return { ...state, sidebarOpen: !state.sidebarOpen };
    
        default:
            return { ...state };
    }
}

