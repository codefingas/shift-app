/*eslint-disable promise/always-return */
import Orm from "../../Orm";
const UsersOrm = new Orm('users');
const NotificationsOrm = new Orm("notifications");

const controller = {
    async notifyUser(user, data){//data is an object of values
        const theUser = await UsersOrm.getOne(user);
        await NotificationsOrm.save(data).then(async (notification) => {
          let notifications = theUser.notifications !== undefined ? [...theUser.notifications, {value: notification.id, seen: false}] : [{value: notification.id, seen: false}];
          await UsersOrm.update({id: user, notifications});
        });
    }
};

export default controller;