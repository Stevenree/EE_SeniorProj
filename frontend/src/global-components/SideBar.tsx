
import { Box, VStack } from '@chakra-ui/layout'
import React, { Component } from 'react'
import {
Drawer,
DrawerBody,
DrawerFooter,
DrawerHeader,
DrawerOverlay,
DrawerContent,
DrawerCloseButton,
} from "@chakra-ui/react"
import { Button, Text } from '@chakra-ui/react'
type DrawerStates = {
isOpen: boolean,
}

export default class SideBar extends Component {

	state: DrawerStates = {
		isOpen: true
	}

	render() {
		return (
		<div>
			<Box h={'100%'} w={'200px'} position={'absolute'} bgColor={'#2B2B2B'}>
				<VStack>
					<Text color={'white'}> Menu </Text>
				</VStack>
			</Box>
		</div>
		)
	}
}
