import { Row } from 'antd'
import React, { Component } from 'react'
import Card from './Card'
import "./style.css";

export class cardListing extends Component {
    render() {
        const cards = [
            {
                title: "Drinking Water", 
                percentage: 75,
                id:1,
            },
            {
                title: "Stretching", 
                percentage: 75,
                id:2
            },
            {
                title: "Relax", 
                percentage: 75,
                id:3
            },
        ]
        return (
            <div className="listing">
                <Row span={24}>
                    {cards.map((props) => <Card {...props} />)}
                </Row>
            </div>
        )
    }
}

export default cardListing
