import { Box, Center, VStack } from '@chakra-ui/layout'
import React, { Component } from 'react'
import { IconButton, Text } from '@chakra-ui/react'
import { route } from './types'
import './SideBar.css'
import { ArrowBackIcon, ArrowForwardIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

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

	// unused
	highlight(e:any){
		e.target.style.background = '#545454'
	}

	render() {

		const route_buttons = page_routes.map( 
			(route) => 
				<Box w={'100%'} _hover={{'background':'#545454'}} cursor={'pointer'}>
					<Center> 
						<Text color="whiteAlpha.900" fontSize="xl"> {route.name} </Text>
					</Center>
				</Box>
		)

		const drawer_handle = (
			<>
			{ this.state.isOpen===true ? 
				<IconButton 
					aria-label="close-button" 
					borderRadius={'100vh'} bgColor={"#2B2B2B"} w="64px" h="64px" boxShadow="none !important"
					icon={<ArrowBackIcon boxSize="36px" color="whiteAlpha.900"/>}
					_hover={{'background':'#545454'}}
					onClick={ () => {this.setState({isOpen:false})} }
				></IconButton> :
				<IconButton 
					aria-label="close-button" 
					borderRadius={'100vh'} bgColor={"#2B2B2B"} w="64px" h="64px" boxShadow="none !important"
					icon={<ArrowForwardIcon boxSize="36px" color="whiteAlpha.900"/>}
					_hover={{'background':'#545454'}}
					onClick={ () => {this.setState({isOpen:true})} }
				></IconButton>
			}
			</>
		)

		return (
			<>
				{/* Container for the sidebar button */}
				<Box position="absolute" w={'150px'} top={"60px"} left={0}>
					<Center>{drawer_handle}</Center>
				</Box>
				{ this.state.isOpen===true ? 
					<Box h={'100%'} w={'150px'} bgColor={'#2B2B2B'} overflow={'hidden'}>
						<VStack>
							<Box h="96px" />
							{route_buttons}
						</VStack>
					</Box> : 
					<> </>
				}
				
			</>
		)
	}
}
