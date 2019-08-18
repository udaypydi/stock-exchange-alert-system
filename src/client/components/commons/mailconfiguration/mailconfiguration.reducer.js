import { 
    MAIL_TITLE_CHANGE, 
    MAIL_MESSAGE_CHANGE,
    MAIL_CONFIG_INIT_STATE,
} from './mailconfiguration.constant';

export default function MailConfigurationReducer(state = MAIL_CONFIG_INIT_STATE, action) {
    switch(action.type) {
        case MAIL_TITLE_CHANGE:
            return { 
                ...state,
                title: action.value,
            }

        case MAIL_MESSAGE_CHANGE:
            return {
                ...state,
                message: action.value,
            };
        
        default:
            return { ...state };
    }
}

