import { Box, Center, Link, VStack } from '@chakra-ui/layout'
import React, { Component } from 'react'
import { IconButton, Text } from '@chakra-ui/react'
import { route } from './types'
import { ArrowBackIcon, ArrowForwardIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

type DrawerStates = {
	isOpen: boolean,
}

const page_routes:route[] = [ 
	{id:0, name:"Home", url:"/"},
	{id:1, name:"Reader", url:"/reader"},
	{id:2, name:"Translator", url:"/"},
	{id:3, name:"Cleaner", url:"/"},
	{id:4, name:"Cards", url:"/"},
	{id:5, name:"Statistics", url:"/"},
	{id:6, name:"About", url:"/"},
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
						<a href={route.url} >
							<Center> 
								<Text color="whiteAlpha.900" fontSize="xl" userSelect="none"> {route.name} </Text>
							</Center>
						</a>
						<Box h="5px"/>
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
			<Box flex={0}>
				{/* Container for the sidebar button */}
				<Box position="absolute" w={'120px'} top={"60px"} left={0}>
					<Center>{drawer_handle}</Center>
				</Box>
				{ this.state.isOpen===true ? 
					<Box h={'100%'} w={'120px'} bgColor={'#2B2B2B'} overflow={'hidden'}>
						<VStack>
							<Box h="96px" />
							{route_buttons}
						</VStack>
					</Box> : 
					<> </>
				}
				
			</Box>
		)
	}
}
