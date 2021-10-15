import { Box, Center, IconButton } from '@chakra-ui/react'
import React, { Component } from 'react'
import { Flex, HStack, VStack} from '@chakra-ui/layout'
import { AttachmentIcon } from '@chakra-ui/icons'
import './Reader.css'
export default class Reader extends Component {
    render() {

        const filemenu = 
            <Box className="menu-btn"
            onClick={
                ()=>{}
            }
            >
                File
            </Box>

        return (
            <Box h="25px" w={'100%'} bgColor="#343434"> 
                <HStack color="whiteAlpha.900"> 
                    {filemenu}
                    <Box className="menu-btn">Recent</Box>
                    <Box className="menu-btn">Edit</Box>
                    <Box className="menu-btn">View</Box>
                    <Box className="menu-btn">About</Box>
                    <Box className="menu-btn">...</Box>

                </HStack>
            </Box>

        )
    }
}
