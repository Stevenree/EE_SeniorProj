import { Box, Flex } from '@chakra-ui/layout'
import { IconButton } from '@chakra-ui/react'
import React, { Component } from 'react'
import { CloseIcon, MinusIcon, CopyIcon } from '@chakra-ui/icons'
import './TitleBar.css'
import TopMenuButton from './MenuButtons/TopMenuButton'
import ChildMenuButton from './MenuButtons/ChildMenuButton'
declare var window: any;

export default function TitleBar() {
const selectDirectory = () => {
        // alert(this.state.pages)
        window.ipcRenderer.send('open-dir-dialog');
      }
  return (
    <Flex bgColor="#2B2B2B" w={"100%"} h={"35px"} flexGrow={0} position={'fixed'} className="title-bar-container"> 
                
                <Flex h={"32px"}  flexGrow={0}  color="whiteAlpha.900">

                    <TopMenuButton menuName="File">
                    <ChildMenuButton name="Open Folder" onClick={selectDirectory} />
                    <ChildMenuButton name="Open Recent" onClick={selectDirectory} />
                    <ChildMenuButton name="Save Project" onClick={() => { }} />
                    <ChildMenuButton name="Exit project" onClick={() => { }} />
                    </TopMenuButton>

                    <TopMenuButton menuName="Edit">
                    </TopMenuButton>

                    <TopMenuButton menuName="View">
                    <ChildMenuButton name="Fullscreen" onClick={() => { }} />
                    </TopMenuButton>

                    <TopMenuButton menuName="About" onClick={() => { }}>
                    </TopMenuButton>
                </Flex>

                {/* Center part of the title bar is draggable*/}
                <Box flex="1" h={"100%"} className="draggable">
                    
                </Box>
                

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
