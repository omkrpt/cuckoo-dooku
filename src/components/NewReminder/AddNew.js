import React, { useEffect, useState, useMemo } from "react";
import { Row, Button, Col, notification, Switch, Input } from "antd";
import AddNewItem from "./AddNewItem";
import { DeleteOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { createAlarm, cancelAlarm } from "../../utils/alarmHandler";
import "./style.css";

const AddNew = ({ id, setReminderPage }) => {
  const [reminder, setReminder] = useState();
  const [noOfTime, setNoOfTime] = useState("Always");
  const [description, setDescription] = useState();
  const [intervalPeriod, setIntervalPeriod] = useState(15);
  const [isSnooze, setIsSnooze] = useState(false);
  const mode = (id && "EDIT") || "CREATE";

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
          desc: desc_,
        } = currentItem;
        setReminder(name_);
        setNoOfTime(noOfTime_);
        setIntervalPeriod(intervalPeriod_);
        setIsSnooze(isSnooze_);
        setDescription(desc_);
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
      case "description":
        {
          setDescription(value);
        }
        break;
    }
  };

  const addNewAlarm = (id) => {
    if (id) {
      createAlarm({
        name: `${id}`,
        period: 0.1,
        delay: 0.1,
        title: reminder,
        message: description || "",
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
    const desc = description || "";
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
              desc,
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
          desc,
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
    for (let index = 1; index <= 20; index++) {
      const text = `${index} ${index === 1 ? "Time" : "Times"}`;
      returnArray.push({ text, value: index });
    }
    return returnArray;
  };

  const intervalPeriodOptions = () => {
    const returnArray = [];
    returnArray.push({text: `15 Minutes`, value: 15});
    returnArray.push({text: `20 Minutes`, value: 20});
    returnArray.push({text: `30 Minutes`, value: 30});
    returnArray.push({text: `45 Minutes`, value: 45});
    returnArray.push({text: `1 Hour`, value: 60});
    returnArray.push({text: `2 Hours`, value: 120});
    returnArray.push({text: `3 Hours`, value: 180});
    return returnArray;
  };

  return (
    <Row align="center">
      <Col className="add-new-container">
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
        <Col className="add-new-item-container">
          <AddNewItem
            items={[
              { value: "Blinking Reminder" },
              { value: "Water Reminder" },
              { value: "Stretch Reminder" },
              { value: "Posture Reminder" },
            ]}
            value={reminder}
            title="Remind me to:"
            onChange={(value) => handleOnItemChange("remindOn", value)}
            autoComplete
          ></AddNewItem>

          <div className="add-new-item-row">
            <Row className="add-new-item-title">{"Description:"}</Row>
            <Input
              value={description}
              onChange={(event) =>
                handleOnItemChange("description", event.target.value)
              }
              placeholder="Do or do not, there is no try."
              size="large"
            />
          </div>

          <AddNewItem
            items={noOfTimeOptions()}
            value={noOfTime}
            title="How many times?"
            onChange={(value) => handleOnItemChange("noOfTime", value)}
          ></AddNewItem>

          <AddNewItem
            value={intervalPeriod}
            title="How often?"
            items={intervalPeriodOptions()}
            onChange={(value) => handleOnItemChange("intervalPeriod", value)}
          ></AddNewItem>

          <div className="add-new-item-row">
            <Row
              align="center"
              justify="space-between"
              className="add-new-item-title"
            >
              {"Disable for a while"}
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
