import { Box } from '@chakra-ui/react'
import React from 'react'

// seperate 
type word = {
  token: string,
}


export default function TextRegion(props:any) {
	
	// Need to grab the parent containers height+width
	// to properly position the boxes if the container is not
	// the  original image size.
	const unhoveredColor 	= '#ff000000'
	const hoveredColor   	= '#fbb97550'
	const persistentColor = '#2ea6ff99'

	const [showText, setShowText] = React.useState(false)
	const [textPersistence, setTextPersistence] = React.useState(false)
	const [regionColor, setRegionColor] = React.useState(unhoveredColor)

	const xmin = props.xyxy[0]
	const xmax = props.xyxy[2]
	const ymin = props.xyxy[1]
	const ymax = props.xyxy[3]

	const naturalWidth = props.naturalArea[0]
	const naturalHeight = props.naturalArea[1]
	
	const togglePersistence = () => {
		if (textPersistence) {
			setTextPersistence(false) 
		} 
		else{	
			setTextPersistence(true)
			setRegionColor(persistentColor)
		}
	}

	// Controls whether the assosciated text area gets displayed.
	const textController = () => {
		// alert("HUH?")
		console.log([showText,textPersistence])
		if ( !showText ) {
			setShowText(true)
			setRegionColor(hoveredColor)
		}
		else if (showText && !textPersistence) {
			setShowText(false)
			setRegionColor(unhoveredColor)
		}
		else return
	}

	const tokens:word[] = props.tokens

	const getZIndex = () => {
		let area = (xmax-xmin) * (ymax - ymin)
		return Math.round(100000/area)
	}

	const renderEachToken = (words:word[]) => {
		return words.map( (word:word) => {
			return <span className='token'>{word.token}</span>
		})

	}
	return (
		<div>
			{ showText 
				?	<Box className="text-reveal-region"
						position={'absolute'}
						left =　{ (xmin/naturalWidth)*100  + 5 + "%" } 
						top =　{ (ymin/naturalHeight)*100  - 5 + "%"}
						onMouseEnter = {() => textController()}
						onMouseLeave = {() => textController()}
						zIndex = {100000}
					>
						{renderEachToken(tokens)}
					</Box>
				: <></>
			}
			<Box className="text-region"
				position={'absolute'} 
				left	={ (xmin/naturalWidth)*100 + "%" } 
				width	={ ((xmax-xmin)/naturalWidth)*100 + "%" }
				top 	={ (ymin/naturalHeight)*100 + "%"}
				height	={ ((ymax-ymin)/naturalHeight)*100 + "%"}
				backgroundColor = {regionColor}
				onMouseEnter = {() => textController()}
				onMouseLeave = {() => textController()}
				onClick = {() => togglePersistence()}
				zIndex = { getZIndex() }
			>
			</Box>
		</div>
		
	)
}
