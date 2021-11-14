import React, { useEffect, useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Row } from "antd";
import logo from "./logo_red_wide.png";

import CardListing from "./components/Card/CardListing";
import AddNew from "./components/NewReminder/AddNew";
import defaultCuckoos from "./utils/defaultCuckoos";

function App() {
  const [reminderPage, setReminderPage] = useState({});

  useEffect(() => {
    const cuckooReminder = window.localStorage.getItem("cuckooReminder");
    if (!cuckooReminder) {
      window.localStorage.setItem(
        "cuckooReminder",
        JSON.stringify(defaultCuckoos)
      );
      window.dispatchEvent(new Event("storage"));
    }
  }, []);

  return (
    <div className="App">
      <Row className="header">
        <img src={logo} alt="Logo" />
      </Row>
      <div className="content-section custom-scroll">
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
