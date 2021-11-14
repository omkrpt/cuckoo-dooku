import { Button } from "antd";
import React, { useEffect, useState, useMemo } from "react";
import Card from "./Card";
import "./style.css";
import { PlusOutlined } from "@ant-design/icons";

const CardListing = ({ setReminderPage }) => {
  const [reminders, setReminders] = useState([]);

  const loadFromStorage = ({ isInit }) => {
    try {
      const cuckooReminder = window.localStorage.getItem("cuckooReminder");
      const reminders = JSON.parse(cuckooReminder);
      if (reminders && Array.isArray(reminders)) {
        setReminders(reminders);
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
      reminders.map(({ name, id, noOfTime, intervalPeriod, completedCycle, isSnooze }) => ({ // Completed Cycle needs to be implemented
        title: name,
        id: id,
        noOfTimeCompleted: completedCycle, 
        maxNoOfTime: noOfTime,
        intervalPeriod: intervalPeriod,
        isSnooze: isSnooze,
      })),
    [reminders]
  );

  const onAddNewClick = () => setReminderPage({ show: true });

  return (
    <div className="listing">
      <Button
        className="add-new-cuckoo-button"
        type="secondary"
        onClick={() => onAddNewClick()}
        icon={<PlusOutlined />}
      >
        Add New Cuckoo
      </Button>
      <div className="list-container">
        {React.Children.toArray(
          cards.map((props) => (
            <Card {...props} setReminderPage={setReminderPage} />
          ))
        )}
      </div>
    </div>
  );
};

export default CardListing;
