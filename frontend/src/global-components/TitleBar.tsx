// @ts-nocheck
import { Box, Flex } from '@chakra-ui/layout'
import { IconButton } from '@chakra-ui/react'
import React, { Component } from 'react'
import { CloseIcon, MinusIcon, CopyIcon } from '@chakra-ui/icons'
import './TitleBar.css'

export default class TitleBar extends Component {
    render() {
        return (
            <Flex bgColor="#2B2B2B" w={"100%"} h={"35px"} flexGrow={0}> 
                
                {/* Center part of the title bar is draggable*/}
                <Box flex="1" h={"100%"} className="draggable">

                </Box>

                {/* There must be a better way to structure these.
                    I tried doing it with CSS and giving them the same class to reduce the code, but I couldn't get it to work. 
                    Look at this later
                */}
                <IconButton className="window-controls"
                    aria-label="minimize"
                    bgColor="#2B2B2B"
                    h={"100%"}
                    borderRadius={0}
                    icon={<MinusIcon color={'gray.400'}/>}
                    onClick={ ()=>{window.ipcRenderer.send("minimizeApp")} }
                ></IconButton>
                
                <IconButton className="window-controls"
                    aria-label="maximize"
                    bgColor="#2B2B2B"
                    h={"100%"}
                    borderRadius={0}
                    icon={<CopyIcon color={'gray.400'}/>}
                    onClick={ ()=>{window.ipcRenderer.send("maximizeApp")} }
                ></IconButton>

                <IconButton className="window-controls close-button"
                    aria-label="close"
                    bgColor="#2B2B2B"
                    h={"100%"}
                    borderRadius={0}
                    icon={<CloseIcon color={'gray.400'}/>}
                    onClick={ ()=>{window.ipcRenderer.send("closeApp")} } 
                ></IconButton>

            </Flex>
        )
    }
}
