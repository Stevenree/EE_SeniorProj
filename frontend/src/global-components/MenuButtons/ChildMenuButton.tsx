import { Button } from '@chakra-ui/button'
import React, { Component } from 'react'
import './MenuButtons.css'

type childMenuBtnTypes = {
    name: string,
}

export default class ChildMenuButton extends Component<any,any> {
    name: string

    constructor(props:childMenuBtnTypes){
        super(props)
        this.name = props.name
    }
    
    render() {
        return (
            <button>
                {this.name}
            </button>
        )
    }
}
