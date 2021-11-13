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
    } catch (error) {
      console.error(error);
      console.warn("Notification data not found for ", alarmName);
    }
  });
});
