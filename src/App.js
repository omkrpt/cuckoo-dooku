import React, { useEffect, useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Row, Button } from "antd";
// import Input from "./components/Card/Input";

import CardListing from "./components/Card/CardListing";
import AddNew from "./components/NewReminder/AddNew";

// import { createAlarm, cancelAlarm } from "./utils/alarmHandler";
// const alarmName = "createAlarmTest";

function App() {
  const [reminderPage, setReminderPage] = useState({});

  useEffect(() => {}, []);

  return (
    <div className="App">
      <div style={{ width: "500px" }}>
        <Row className="header">Count Cuckoo</Row>
        {reminderPage.show ? (
          <AddNew id={reminderPage.id} setReminderPage={setReminderPage} />
        ) : (
          <CardListing setReminderPage={setReminderPage} />
        )}
      </div>
    </div>
  );
}

export default App;
