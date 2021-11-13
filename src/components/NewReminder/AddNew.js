import React, { useEffect, useState, useMemo } from "react";
import { Row, Button, Col, notification, Switch } from "antd";
import AddNewItem from "./AddNewItem";
import { DeleteOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { createAlarm, cancelAlarm } from "../../utils/alarmHandler";
import "./style.css";

const AddNew = ({ id, setReminderPage }) => {
  const [reminder, setReminder] = useState();
  const [noOfTime, setNoOfTime] = useState();
  const [intervalPeriod, setIntervalPeriod] = useState();
  const [isSnooze, setIsSnooze] = useState(false);
  const mode = (id && "EDIT") || "CREATE";
  // const [reminderOptions, setReminderOptions] = useState([]);

  const isSaveDisabled = useMemo(() => {
    return !reminder || !noOfTime || !intervalPeriod;
  }, [reminder, noOfTime, intervalPeriod]);

  useEffect(() => {
    const cuckooReminder = window.localStorage.getItem("cuckooReminder");
    const reminders = cuckooReminder && JSON.parse(cuckooReminder);
    if (reminders && Array.isArray(reminders)) {
      const currentItem = reminders.find(({ id: itemId }) => itemId === id);
      if (currentItem) {
        const {
          name: name_,
          noOfTime: noOfTime_,
          intervalPeriod: intervalPeriod_,
          isSnooze: isSnooze_,
        } = currentItem;
        setReminder(name_);
        setNoOfTime(noOfTime_);
        setIntervalPeriod(intervalPeriod_);
        setIsSnooze(isSnooze_);
      }
    }
  }, [id]);

  const handleOnItemChange = (type, value) => {
    switch (type) {
      case "remindOn":
        {
          setReminder(value);
        }
        break;
      case "noOfTime":
        {
          setNoOfTime(value);
        }
        break;
      case "intervalPeriod":
        {
          setIntervalPeriod(value);
        }
        break;
      case "snooze":
        {
          setIsSnooze(value);
        }
        break;
    }
  };

  const addNewAlarm = (id) => {
    if (id) {
      createAlarm({
        name: `${id}`,
        period: 0.1,
        title: reminder,
        message: `This reminder for every ${intervalPeriod} minutes`,
      });
    }
  };

  const deleteAlarm = () => {
    if (id) {
      cancelAlarm(`${id}`);
      const cuckooReminder = window.localStorage.getItem("cuckooReminder");
      let reminders = cuckooReminder ? JSON.parse(cuckooReminder) : [];
      if (reminders && Array.isArray(reminders)) {
        reminders = reminders.filter((item) => item.id !== id);
      }
      window.localStorage.setItem("cuckooReminder", JSON.stringify(reminders));
      window.dispatchEvent(new Event("storage"));
      notification.success({
        key: new Date(),
        message: "Cuckoo deleted successfully.",
      });
      goBack();
    }
  };

  const addNewReminder = () => {
    console.log(reminder, noOfTime, intervalPeriod);
    const cuckooReminder = window.localStorage.getItem("cuckooReminder");
    let reminders = cuckooReminder ? JSON.parse(cuckooReminder) : [];
    const uniqueId = id || Math.random();
    if (reminders && Array.isArray(reminders)) {
      if (mode === "EDIT") {
        reminders = reminders.map((item) => {
          if (item.id === uniqueId) {
            cancelAlarm(`${uniqueId}`);
            return {
              id: uniqueId,
              name: reminder,
              noOfTime,
              intervalPeriod,
              completedCycle: 0,
              isSnooze,
            };
          }
          return item;
        });
      } else {
        reminders.unshift({
          id: uniqueId,
          name: reminder,
          noOfTime,
          intervalPeriod,
          completedCycle: 0,
          isSnooze,
        });
      }
      window.localStorage.setItem("cuckooReminder", JSON.stringify(reminders));
      window.dispatchEvent(new Event("storage"));
      if (!isSnooze) {
        addNewAlarm(uniqueId);
      }
      notification.success({
        key: new Date(),
        message: `Cuckoo ${
          mode === "EDIT" ? "updated" : "created"
        } successfully.`,
      });
    }
    goBack();
  };

  const goBack = () => {
    setReminderPage({});
  };

  const noOfTimeOptions = () => {
    const returnArray = [];
    returnArray.push({ text: "Always", value: "always" });
    for (let index = 1; index <= 100; index++) {
      const text = `${index} ${index === 1 ? "Time" : "Times"}`;
      returnArray.push({ text, value: index });
    }
    return returnArray;
  };

  const intervalPeriodOptions = () => {
    const returnArray = [];
    for (let index = 1; index <= 60; index++) {
      const text = `${index} ${index === 1 ? "Minute" : "Minutes"}`;
      returnArray.push({ text, value: index });
    }
    return returnArray;
  };

  return (
    <Row align="center">
      <Col className="add-new-conatiner">
        <Row align="center" justify="space-between">
          <Button
            className="back-button"
            type="primary"
            onClick={() => goBack()}
            icon={<ArrowLeftOutlined />}
          >
            Back
          </Button>
          {mode === "EDIT" && (
            <Button
              className="back-button"
              type="danger"
              onClick={() => deleteAlarm()}
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          )}
        </Row>
        <Col className="add-new-item-conatiner">
          <AddNewItem
            items={[]}
            value={reminder}
            title="Remind me to:"
            onChange={(value) => handleOnItemChange("remindOn", value)}
            autoComplete
          ></AddNewItem>
          <AddNewItem
            items={noOfTimeOptions()}
            value={noOfTime}
            title="How many times?"
            onChange={(value) => handleOnItemChange("noOfTime", value)}
          ></AddNewItem>
          <AddNewItem
            value={intervalPeriod}
            title="Interval period?"
            items={intervalPeriodOptions()}
            onChange={(value) => handleOnItemChange("intervalPeriod", value)}
          ></AddNewItem>
          <div className="add-new-item-row">
            <Row
              align="center"
              justify="space-between"
              className="add-new-item-title"
            >
              {"Snooze for a while"}
              <Switch
                checked={isSnooze}
                onChange={(value) => handleOnItemChange("snooze", value)}
              />
            </Row>
          </div>
          <Button
            disabled={isSaveDisabled}
            className="add-new-button"
            type="primary"
            onClick={() => addNewReminder()}
          >
            {`${mode === "EDIT" ? "Update" : "Add"} Cuckoo`}
          </Button>
        </Col>
      </Col>
    </Row>
  );
};

export default AddNew;
