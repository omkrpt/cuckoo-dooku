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
            },
            {
                title: "Stretching", 
                percentage: 75,
            },
            {
                title: "Relax", 
                percentage: 75,
            },
        ]
        return (
            <div className="container">
                <Row span={24}>
                    {cards.map((props) => <Card {...props} />)}
                </Row>
            </div>
        )
    }
}

export default cardListing
