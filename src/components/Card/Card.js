import { Col, Progress, Tag } from "antd";
import React, { Component } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";

export class card extends Component {
  render() {
    const {
      title = "Drink Water",
      id,
      setReminderPage,
      maxNoOfTime,
      noOfTimeCompleted = 0,
      intervalPeriod,
    } = this.props;
    return (
      <Col
        span={24}
        className="card"
        onClick={() => setReminderPage({ show: true, id })}
      >
        <div className="card-content">
          <div className="card-title">
            <div className="card-name">{title}</div>
            {/* <Tag icon={<CheckCircleOutlined />} className="completed-intervals" color="magenta">{noOfTimeCompleted}/{maxNoOfTime}</Tag> */}
            <Tag className="interval-period" color="#53b928">
              {`${intervalPeriod} ${
                intervalPeriod === 0 ? "Minute" : "Minutes"
              }`}
            </Tag>
          </div>
          <div>
            <Progress
              type="circle"
              width={70}
              strokeColor={{
                "0%": "#ffc800",
                "100%": "#ffc800",
              }}
              percent={(noOfTimeCompleted / maxNoOfTime) * 100}
              format={() =>
                maxNoOfTime === "always"
                  ? "Ꝏ"
                  : `${noOfTimeCompleted}/${maxNoOfTime}`
              }
            />
          </div>
        </div>
        <Progress
          strokeColor={{
            "0%": "#fbc800",
            "100%": "#e86464",
          }}
          percent={100}
          showInfo={false}
        />
      </Col>
    );
  }
}

export default card;
