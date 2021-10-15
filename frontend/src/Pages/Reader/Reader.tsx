import { Box, Center, IconButton } from '@chakra-ui/react'
import React, { Component } from 'react'
import { Flex, HStack, VStack} from '@chakra-ui/layout'
import { AttachmentIcon } from '@chakra-ui/icons'
import './Reader.css'
import ChildMenuButton from 'src/global-components/MenuButtons/ChildMenuButton'
import TopMenuButton from 'src/global-components/MenuButtons/TopMenuButton'
export default class Reader extends Component {
    render() {

        return (
            <Box h="32px" w={'100%'} bgColor="#343434"> 
                <HStack color="whiteAlpha.900"> 
                    <TopMenuButton menuName="File">
                        <ChildMenuButton name="AH"/>
                    </TopMenuButton>
                    <TopMenuButton menuName="Edit"/>
                    <TopMenuButton menuName="View"/>
                    <TopMenuButton menuName="About"/>
                </HStack>
            </Box>

        )
    }
}
