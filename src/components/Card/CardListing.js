import { Row } from "antd";
import React, { useEffect, useState, useMemo } from "react";
import Card from "./Card";
import "./style.css";

const CardListing = ({ setReminderPage }) => {
  const [reminders, setReminders] = useState([]);

  const loadFromStorage = ({ isInit }) => {
    try {
      const cuckooReminder = window.localStorage.getItem("cuckooReminder");
      const reminders = JSON.parse(cuckooReminder);
      if (reminders && Array.isArray(reminders)) {
        setReminders(reminders);
        setReminderPage({ show: false });
      } else {
        if (isInit) setReminderPage({ show: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFromStorage({ isInit: true });
    window.addEventListener("storage", loadFromStorage);
    return () => {
      window.removeEventListener("storage", loadFromStorage);
    };
  }, []);

  const cards = useMemo(
    () =>
      reminders.map(({ name, id, noOfTime, intervalPeriod, completedCycle }) => ({ // Completed Cycle needs to be implemented
        title: name,
        id: id,
        noOfTimeCompleted: completedCycle, 
        maxNoOfTime: noOfTime,
        intervalPeriod: intervalPeriod,
      })),
    [reminders]
  );

  return (
    <div className="listing">
      <Row span={24}>
        {React.Children.toArray(
          cards.map((props) => <Card {...props} setReminderPage={setReminderPage} />)
        )}
      </Row>
    </div>
  );
};

export default CardListing;
