import React from "react";
import { Row, Select, AutoComplete } from "antd";
import "./style.css";

const { Option } = Select;

const AddNewItem = ({
  title,
  value,
  items = [],
  onChange,
  autoComplete = false,
}) => {
  const onSearch = () => {};

  return (
    <div className="add-new-item-row">
      <Row className="add-new-item-title">{title}</Row>
      {autoComplete ? (
        <AutoComplete
          value={value}
          options={items}
          style={{
            width: "100%",
          }}
          onSelect={onChange}
          onChange={onChange}
          onSearch={onSearch}
          placeholder="Input here"
          size="large"
        />
      ) : (
        <Select
          showSearch
          size="large"
          value={value}
          onChange={onChange}
          placeholder="Select"
          style={{ width: "100%" }}
        >
          {React.Children.toArray(
            items.map(({ text, value }) => (
              <Option value={value}>{text}</Option>
            ))
          )}
        </Select>
      )}
    </div>
  );
};

export default AddNewItem;
