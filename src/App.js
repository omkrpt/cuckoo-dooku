import "./App.css";
import "antd/dist/antd.css";
import { Row, Button } from "antd";
// import Input from "./components/Card/Input";

import CardListing from "./components/Card/CardListing";
import AddNew from "./components/NewReminder/AddNew";

// import { createAlarm, cancelAlarm } from "./utils/alarmHandler";
// const alarmName = "createAlarmTest";

import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div style={{ width: "500px" }}>
        <Row className="header">Count Cuckoo</Row>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CardListing />}>
              <Route path=":id" element={<AddNew />} />
            </Route>
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
    </div>
  );
}

export default App;
