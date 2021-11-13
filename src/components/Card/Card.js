import { Col, Progress } from "antd";
import React, { Component } from "react";

export class card extends Component {
  render() {
    const {
      title = "Drink Water",
      percentage,
      id,
      setReminderPage,
    } = this.props;
    return (
      <Col
        span={24}
        className="card"
        onClick={() => setReminderPage({ show: true, id })}
      >
        <div className="card-content">
          <div>{title}</div>
          <div>
            <Progress type="circle" percent={percentage} width={80} />
          </div>
        </div>
        <Progress
          strokeColor={{
            "0%": "#ffc800",
            "100%": "#ffc800",
          }}
          percent={99.9}
          showInfo={false}
        />
      </Col>
    );
  }
}

export default card;
