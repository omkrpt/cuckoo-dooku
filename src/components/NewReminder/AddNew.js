import React from "react";
import { Row, Button, Col, Progress } from "antd";
import AddNewItem from "./AddNewItem";
import "./style.css";

const AddNew = ({}) => {
  const handleOnItemChange = () => {};

  const addNewTime = () => {};

  const reminderOptions = () => {
    const returnArray = [];
    returnArray.push({ text: "Water Reminder", value: "water" });
    returnArray.push({ text: "Blinking Reminder", value: "blinking" });
    returnArray.push({ text: "Stretch Reminder", value: "stretch" });
    returnArray.push({ text: "Posture Reminder", value: "posture" });
    returnArray.push({ text: "Custom", value: "custom" });
    return returnArray;
  };

  const noOfTimeOptions = () => {
    const returnArray = [];
    returnArray.push({ text: "Always", value: "always" });
    for (let index = 1; index <= 10; index++) {
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
        <Row className="add-new-header">New Cuckoo</Row>
        <Col className="add-new-item-conatiner">
          <AddNewItem
            items={reminderOptions()}
            value={undefined}
            title="Remind me to:"
            onChange={(value) => handleOnItemChange("remindOn", value)}
          ></AddNewItem>
          <AddNewItem
            items={noOfTimeOptions()}
            value={undefined}
            title="How many times?"
            onChange={(value) => handleOnItemChange("noOfTime", value)}
          ></AddNewItem>
          <AddNewItem
            value={undefined}
            title="Interval period?"
            items={intervalPeriodOptions()}
            onChange={(value) => handleOnItemChange("intervalPeriod", value)}
          ></AddNewItem>
          <Button
            className="add-new-button"
            type="primary"
            onClick={() => addNewTime({})}
          >
            Add Cuckoo
          </Button>
        </Col>
      </Col>
    </Row>
  );
};

export default AddNew;
