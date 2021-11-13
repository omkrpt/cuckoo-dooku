import React from "react";
import { Row, Select } from "antd";
import "./style.css";

const { Option } = Select;

const AddNewItem = ({ title, value, items = [], onChange }) => (
  <div className="add-new-item-row">
    <Row className="add-new-item-title">{title}</Row>
    <Select
      showSearch
      size="large"
      value={value}
      onChange={onChange}
      placeholder="Select"
      style={{ width: "100%" }}
      defaultValue={items?.[0]?.value}
    >
      {React.Children.toArray(
        items.map(({ text, value }) => <Option value={value}>{text}</Option>)
      )}
    </Select>
  </div>
);

export default AddNewItem;
