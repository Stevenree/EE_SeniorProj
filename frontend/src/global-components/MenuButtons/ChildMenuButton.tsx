import React, { Component } from 'react'
import './MenuButtons.css'

type childMenuBtnTypes = {
    name: string,
}

export default class ChildMenuButton extends Component<any,any> {
    name: string
    
    // declare an empty arrow function
    buttonClicked = () => {}

    constructor(props:childMenuBtnTypes){
        super(props)
        this.name = props.name
        this.buttonClicked = () => {this.props.onClick()}
    }
    
    render() {
        return (
            <button onClick={this.buttonClicked}>
                {this.name}
            </button>
        )
    }
}
