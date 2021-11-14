import React, { useState } from "react";
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
  const [autoCompleteItems, setAutoCompleteItems] = useState(items);

  const onSearch = (searchValue) => {
    const filter = items.filter((item) =>
      `${item.value}`.toLowerCase().includes(`${searchValue}`.toLowerCase())
    );
    if (filter.length) {
      setAutoCompleteItems(filter);
    } else {
      setAutoCompleteItems([{ value: `${searchValue} Reminder` }]);
    }
  };

  return (
    <div className="add-new-item-row">
      <Row className="add-new-item-title">{title}</Row>
      {autoComplete ? (
        <AutoComplete
          value={value}
          options={autoCompleteItems}
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
