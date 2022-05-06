import { Box } from '@chakra-ui/react'
import React from 'react'

// seperate 

type panelRegion = {
  xmin: number,
  ymin: number,
  xmax: number,
  ymax: number,
}

type regionProps = {
	xyxy: number[],
	naturalArea: number[],
	tokens: word[],
	panelRegion: panelRegion,
	setToken: any, // idk what the type of a const function is lol
	setDefinition: any,
	setSentence: any,
	togglePopup: any,
	setPanelRegion: any,
}

type word = {
  token: string,
	lemma: string,
  definitions: string[],
}

export default function TextRegion(props:regionProps) {
	
	// Need to grab the parent containers height+width
	// to properly position the boxes if the container is not
	// the  original image size.
	const unhoveredColor 	= '#ffFF0040'
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
	const panelRegion = props.panelRegion

	const togglePersistence = () => {
		if (textPersistence) {
			setTextPersistence(false) 
		} 
		else{	
			setTextPersistence(true)
			setRegionColor(persistentColor)
		}
	}

	// Control logic for  whether the assosciated text area gets displayed.
	const textController = () => {
		// alert("HUH?")
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
	const setText = () => {
		setShowText(true)
		setRegionColor(hoveredColor)
	}
	const removeText = () => {
		if (!textPersistence){
			setShowText(false)
			setRegionColor(unhoveredColor)
		}
	}

	const tokens:word[] = props.tokens

	const getZIndex = () => {
		let area = (xmax-xmin) * (ymax - ymin)
		return Math.round(100000/area)
	}

	const renderEachToken = (words:word[]) => {
		return words.map( (word:word) => {
			return <span className='token' 
			onClick={ () => {
				let sentence:string = '' // do this in one line?
				tokens.forEach((w:word) => sentence += w.token)
				props.togglePopup()
				props.setToken(word.token)
				props.setDefinition(word.definitions)
				props.setSentence(sentence)
				props.setPanelRegion(props.panelRegion)
				}}>
				{word.token}
			</span>
		})
	}

	return (
		<div>
			{ showText 
				?	<Box className="text-reveal-region"
						position={'absolute'}
						left =　{ (xmin/naturalWidth)*100  + 5 + "%" } 
						top =　{ (ymin/naturalHeight)*100  - 5 + "%"}
						onMouseEnter = {() => setText()}
						onMouseLeave = {() => removeText()}
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
				onMouseEnter = {() => setText()}
				onMouseLeave = {() => removeText()}
				onClick = {() => togglePersistence()}
				zIndex = { getZIndex() }
			>
			</Box>
		</div>
		
	)
}
