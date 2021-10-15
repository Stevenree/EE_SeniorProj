import { Box, Center, IconButton } from '@chakra-ui/react'
import React, { Component } from 'react'
import { Flex, HStack, VStack} from '@chakra-ui/layout'
import { AttachmentIcon } from '@chakra-ui/icons'
import TopMenuButton from 'src/global-components/TopMenuButton'
import './Reader.css'
export default class Reader extends Component {
    render() {

        const filemenu = 
            <div>
                <button id="fileMenu" className="menuTop" 
                aria-haspopup="true" aria-expanded="false" aria-label="File">
                    File
                </button>
            </div>

        return (
            <Box h="25px" w={'100%'} bgColor="#343434"> 
                <HStack color="whiteAlpha.900"> 
                    <TopMenuButton menuName="File"/>
                    <TopMenuButton menuName="Edit"/>
                    <TopMenuButton menuName="View"/>
                    <TopMenuButton menuName="About"/>
                </HStack>
            </Box>

        )
    }
}
