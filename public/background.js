chrome.alarms.onAlarm.addListener((alarm) => {
  console.log("alarm ring", alarm);
  chrome.notifications.create(`test ${new Date()}`, {
    type: "basic",
    title: "Test Message hii",
    message: "You are awesome!",
    priority: 2,
    iconUrl:
      "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
  });
});
