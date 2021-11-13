import "./App.css";
import "antd/dist/antd.css";
import { Button } from "antd";
import Input from "./components/Card/Input";
import CardListing from "./components/Card/CardListing";
import AddNew from "./components/NewReminder/AddNew";
import { createAlarm, cancelAlarm } from "./utils/alarmHandler";
const alarmName = "createAlarmTest";

function App() {
  return (
    <div className="App">
      <h1>Count Cuckoo</h1>
      <AddNew />

      {/* <Button
        type="primary"
        onClick={() => createAlarm({ name: alarmName, period: 0.1 })}
      >
        Start
      </Button>
      <Button type="primary" onClick={() => cancelAlarm(alarmName)}>
        Clear
      </Button> */}
    </div>
  );
}

export default App;
