import Notification from "src/model/Notification";

const isExistingUser = (notification: Notification): boolean => {
    return notification !== undefined && notification !== null && Object.keys(notification).length !== 0;
}

export { isExistingUser };