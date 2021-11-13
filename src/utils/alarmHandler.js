/*global chrome*/

function createAlarm({ name, period, delay = 0 }) {
  chrome.alarms.create(name, {
    delayInMinutes: delay,
    periodInMinutes: period,
  });
}

function cancelAlarm(alarmName) {
  chrome.alarms.clear(alarmName);
}

module.exports = { createAlarm, cancelAlarm };
