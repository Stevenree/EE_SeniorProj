import { Box, Center, IconButton } from '@chakra-ui/react'
import React, { Component, useRef } from 'react'
import { Flex, HStack, VStack} from '@chakra-ui/layout'
import { AttachmentIcon } from '@chakra-ui/icons'
import './Reader.css'
import ChildMenuButton from 'src/global-components/MenuButtons/ChildMenuButton'
import TopMenuButton from 'src/global-components/MenuButtons/TopMenuButton'
export default class Reader extends Component {
    render() {

        return (
            <Box h="32px" w={'100%'} bgColor="#343434"> 
                <Flex w={"100%"} h={"32px"} flexGrow={0} color="whiteAlpha.900">
                    <TopMenuButton menuName="File">
                        <ChildMenuButton name="Open Folder" 
                            onClick={()=>{alert("Open Folder...")}}
                        />
                        <ChildMenuButton name="Open Recent"/>
                        <ChildMenuButton name="Save Project"/> 
                        <ChildMenuButton name="Exit project"/>
                    </TopMenuButton>

                    <TopMenuButton menuName="Edit"> 
                    
                    </TopMenuButton>
                    
                    <TopMenuButton menuName="View">
                        <ChildMenuButton name="Fullscreen"/>
                    </TopMenuButton>

                    <TopMenuButton menuName="About">
                    
                    </TopMenuButton>
                </Flex>
            </Box>

        )
    }
}
