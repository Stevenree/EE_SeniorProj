import React, { Component } from 'react'

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
            <div>
                <button id="fileMenu" className="menuTop" 
                aria-haspopup="true" aria-expanded="false" aria-label="File">
                    {this.menuName}
                </button>
                    {this.children?.toString()}
            </div>
        )
    }
}
