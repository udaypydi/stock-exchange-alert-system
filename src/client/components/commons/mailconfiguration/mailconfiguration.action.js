import { MAIL_TITLE_CHANGE, MAIL_MESSAGE_CHANGE } from './mailconfiguration.constant';

export function mailTitleChange(value) {
    return {
        type: MAIL_TITLE_CHANGE,
        value,
    };
}

export function mailMessageChnage(value) {
    return {
        type: MAIL_MESSAGE_CHANGE,
        value,
    }
}
