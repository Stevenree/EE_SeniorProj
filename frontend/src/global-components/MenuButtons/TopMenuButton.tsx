import React, { Component } from 'react'
import './MenuButtons.css'

type topMenuBtnProps = {
    menuName: string,
    children: React.ReactNode
}

export default class TopMenuButton extends Component<any,any> {
    menuName: any
    children: React.ReactNode

    constructor(props:topMenuBtnProps){
        super(props)
        this.menuName = props.menuName
        this.children = props.children
    }

    render() {
        return (
            <div className="menuContainer">
                {/* Top Menu Button */}
                <button id={this.menuName} className="menuButton" 
                    aria-haspopup="true" 
                    aria-expanded="false" 
                    aria-label={this.menuName}>
                    {this.menuName}
                </button>
                
                {/* Child Menu */}
                <div className="menuItemContainer">
                    {this.children}
                </div>
            </div>
        )
    }
}
