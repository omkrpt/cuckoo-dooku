import "./App.css";
import "antd/dist/antd.css";
import { Button } from "antd";
// import Input from "./components/Input";
import CardListing from "./components/CardListing";
// import { createAlarm, cancelAlarm } from "./utils/alarmHandler";
import { Route, Routes } from "react-router";
import TimerConfig from "./components/TimerConfig";
import { BrowserRouter } from "react-router-dom";
const alarmName = "createAlarmTest";

function App() {
  return (
    <div className="App">
      <h1>Welcome to Count-Cuckoo</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CardListing />} />
          <Route path=":id" element={<TimerConfig />} />
        </Routes>
      </BrowserRouter>
      

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
