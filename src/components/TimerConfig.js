import { Col, Input, InputNumber, Radio, Row, Slider, Select } from 'antd'
import React, { Component } from 'react'
const {Option} = Select

export class TimerConfig extends Component {

    constructor(props) {
        super(props)
    
    }
    


    render() {
        return (
            <Row span={24} className="config">
                <Col span={24}>
                    <div className="label">Remind me to:</div>
                    <Input id="activity-name" placeholder="Borderless" bordered={false} />
                </Col>    
                <Col span={24}>
                    <div className="label">Interval Period</div>
                    <Radio.Group value={this.state.timeInterval}>
                        <Radio value={1}>15 Mins</Radio>
                        <Radio value={2}>30 Mins</Radio>
                        <Radio value={3}>45 Mins</Radio>
                        <Radio value={4}>60 Mins</Radio>
                        <Radio value="custom">Custom</Radio>
                    </Radio.Group>
                    {this.state.timeInterval === "custom" && <div>
                        <Slider
                            min={1}
                            max={20}
                            onChange={(val) => this.setState({})}
                            // value={typeof inputValue === 'number' ? inputValue : 0}
                        />
                        <InputNumber
                            min={1}
                            max={20}
                            style={{ margin: '0 16px' }}
                            // value={inputValue}
                            // onChange={this.onChange}
                        />
                        <Select defaultValue="lucy" style={{ width: 120 }}>
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>
                                Disabled
                            </Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </div>}
                </Col>    
                <Col></Col>    
                <Col></Col>    
                <Col></Col>    
            </Row>
        )
    }
}

export default TimerConfig
