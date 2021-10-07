
import { Box, Center, Divider, VStack } from '@chakra-ui/layout'
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
import { route } from './types'
import './SideBar.css'

type DrawerStates = {
	isOpen: boolean,
}

const page_routes:route[] = [ 
	{id:1, name:"Reader", url:""},
	{id:2, name:"Translator", url:""},
	{id:3, name:"Cleaner", url:""},
	{id:4, name:"Cards", url:""},
	{id:5, name:"Statistics", url:""},
	{id:6, name:"About", url:""},
]

export default class SideBar extends Component {

	state: DrawerStates = {
		isOpen: true
	}

	highlight(e:any){
		e.target.style.background = '#545454'
	}

	render() {

		const route_buttons = page_routes.map( 
			(route) => (
				<Box
					w={'100%'}
					_hover={{'background':'#545454'}}
					cursor={'pointer'}
				>
					<Center> 
						<Text color="whiteAlpha.900" fontSize="xl"> {route.name} </Text>
					</Center>
				</Box>
			))

		return (
			<Box 
			h={'100%'} w={'200px'} 
			bgColor={'#2B2B2B'}
			overflow={'hidden'}
			>
				<VStack>
					
					<Box marginBottom={'60px'}/>

					{route_buttons}
				</VStack>

			</Box>
		)
	}
}
