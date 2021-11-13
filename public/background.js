chrome.alarms.onAlarm.addListener((alarm) => {
  var alarmName = alarm.name;
  console.warn("alarm ring", alarmName);
  chrome.storage.sync.get(alarmName, ({ [alarmName]: msg }) => {
    try {
      var { title, message } = JSON.parse(msg);
      chrome.notifications.create(`count-cuckoo-${new Date()}`, {
        type: "basic",
        title,
        message,
        priority: 2,
        iconUrl:
          "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
      });

      const cuckooReminder = window.localStorage.getItem("cuckooReminder");
      let reminders = cuckooReminder && JSON.parse(cuckooReminder);
      if (reminders && Array.isArray(reminders)) {
        reminders = reminders.map((item) => {
          if (`${item.id}` === alarmName) {
            return {
              ...item,
              completedCycle: !isNaN(item.completedCycle)
                ? item.completedCycle + 1
                : 0,
            };
          }
          return item;
        });
        window.localStorage.setItem(
          "cuckooReminder",
          JSON.stringify(reminders)
        );
        window.dispatchEvent(new Event("storage"));
      }
    } catch (error) {
      console.error(error);
      console.warn("Notification data not found for ", alarmName);
    }
  });
});
