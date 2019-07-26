import { 
    FETCH_CURRENCY_DATA, 
    DASHBOARD_HOME_INITIAL_STATE ,
} from './dashboardhome.constant';

export default function DashboardHomeReducer(state = DASHBOARD_HOME_INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_CURRENCY_DATA:
            return {
                ...state,
                eurusd: action.value['eurusd'],
                usdjpy: action.value['usdjpy'],
                usdgyd: action.value['usdgyd'],
                audnzd: action.value['audnzd']
            };
        default:
            return { ...state };
    }
}
