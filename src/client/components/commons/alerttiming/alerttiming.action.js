import { ALERT_TIMING_CHANGE } from './alerttiming.constant';

export function alertTimingChange(value, key) {
    return {
        type: ALERT_TIMING_CHANGE,
        value,
        key,
    };
}
