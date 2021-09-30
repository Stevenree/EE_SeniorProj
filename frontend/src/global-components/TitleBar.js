import { Box, Center, Flex, HStack, VStack } from '@chakra-ui/layout'
import { Button, Text } from '@chakra-ui/react'
import React, { Component } from 'react'
import './TitleBar.css'

export default class TitleBar extends Component {
    render() {
        return (
            <Flex bgColor="#2B2B2B" w={"100%"} h={"60px"}> 
                
                <Center marginLeft={"10px"}>
                    <Button>_</Button>
                </Center>

                <Box flex="1" className="draggable">
                </Box>

                <Center>
                    <Button 
                        colorScheme="green"
                        onClick={ ()=>{window.ipcRenderer.send("minimizeApp")} }
                    >
                        .
                    </Button>
                </Center>

                <Center>
                    <Button 
                    colorScheme="yellow"
                    onClick={ ()=>{window.ipcRenderer.send("maximizeApp")} }
                    >
                        .
                    </Button>
                </Center>

                <Center>
                    <Button 
                        colorScheme="red" 
                        onClick={ ()=>{window.ipcRenderer.send("closeApp")} } 
                    > 
                        .
                    </Button>
                </Center>

            </Flex>
        )
    }
}
