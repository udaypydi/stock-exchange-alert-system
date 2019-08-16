import { 
    SIDEBAR_TOGGLE_STATUS, 
    SIDEBAR_INIT_STATE,
    MOBILE_SIDEBAR_TOGGLE_STATUS,
} from './header.constant';

export default function sidebarReducer(state = SIDEBAR_INIT_STATE, action) {
    switch(action.type) {
        case SIDEBAR_TOGGLE_STATUS:
            return { ...state, sidebarOpen: !state.sidebarOpen };
    
        case MOBILE_SIDEBAR_TOGGLE_STATUS:
            return { ...state,  mobileSidebarOpen: !state.mobileSidebarOpen };
                    
        default:
            return { ...state };
    }
}
