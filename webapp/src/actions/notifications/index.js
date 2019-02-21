import { ADD_NOTIFICATION } from "./types";

export function addNotification(notif) {
    return { type: ADD_NOTIFICATION, payload: notif };
}