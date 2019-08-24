import { 
    FETCH_CURRENCY_DATA, 
    DASHBOARD_HOME_INITIAL_STATE ,
    IS_LOADING,
} from './dashboardhome.constant';

export default function DashboardHomeReducer(state = DASHBOARD_HOME_INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_CURRENCY_DATA:
            return {
                ...state,
                currencyGraphs: action.value,
            };

        case IS_LOADING:
            return {
                ...state,
                isLoading: !state.isLoading,
            };
            
        default:
            return { ...state };
    }
}
