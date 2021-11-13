/*global chrome*/
import { useEffect } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Button } from "antd";

function App() {
  useEffect(() => {}, []);

  const alarmName = "alarmName";

  function createAlarm() {
    chrome.alarms.create(alarmName, {
      delayInMinutes: 0,
      periodInMinutes: 0.1,
    });
  }

  function cancelAlarm() {
    chrome.alarms.clear(alarmName);
  }

  return (
    <div className="App">
      <h1>welcome to Count-Cuckoo</h1>
      <Button type="primary" onClick={createAlarm}>
        Start
      </Button>
      <Button type="primary" onClick={cancelAlarm}>
        Clear
      </Button>
    </div>
  );
}

export default App;
