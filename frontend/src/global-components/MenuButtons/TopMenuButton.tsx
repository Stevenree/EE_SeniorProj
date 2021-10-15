import React, { Component } from 'react'
import './MenuButtons.css'

type topMenuBtnProps = {
    menuName: string,
    children: React.ReactNode,
    childrenVisible: boolean,
}

export default class TopMenuButton extends Component<any,any> {
    menuName: any
    children: React.ReactNode
    state : {childrenVisible: boolean}


    constructor(props:topMenuBtnProps){
        super(props)
        this.menuName = props.menuName
        this.children = props.children
        this.state = {
            childrenVisible: false,
        }
    }

    render() {
        return (
            <div className="menuContainer">
                {/* Top Menu Button */}
                <button id={this.menuName}
                    aria-haspopup="true" 
                    aria-expanded="false" 
                    aria-label={this.menuName}
                    onClick={ () => {
                        this.state.childrenVisible ?
                            this.setState({childrenVisible:false}) :
                            this.setState({childrenVisible:true})
                        
                        let thisMenu = document.getElementById(this.menuName)
                        let x = thisMenu?.getAttribute("aria-expanded"); 
                        if (x === "true") {x = "false"} else {x = "true"}
                        thisMenu?.setAttribute("aria-expanded", x)
                    }}
                >
                    {this.menuName}
                </button>
                
                {/* Child Menu */}
                { this.state.childrenVisible? 
                    <div className="menuItemContainer">
                        {this.children}
                    </div> :
                    <></>
                }

            </div>
        )
    }
}
