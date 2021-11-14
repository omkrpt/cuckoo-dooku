/*global chrome*/

function createAlarm({
  name,
  period,
  delay = 0,
  title = "title",
  message = "description",
}) {
  const msg = JSON.stringify({ title, message });
  chrome.storage.sync.set({ [name]: msg }, function () {
    chrome.alarms.create(name, {
      delayInMinutes: delay,
      periodInMinutes: period,
    });
  });
}
function cancelAlarm(alarmName) {
  chrome.storage.sync.remove(alarmName, function () {
    chrome.alarms.clear(alarmName);
  });
}

export { createAlarm, cancelAlarm };
