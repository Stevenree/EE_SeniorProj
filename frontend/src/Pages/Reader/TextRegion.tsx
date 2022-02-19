import { Box } from '@chakra-ui/react'
import React, { Component, useRef } from 'react'


export default function TextRegion(props:any) {
	
	// Need to grab the parent containers height+width
	// to properly position the boxes if the container is not
	// the  original image size.
	
	const xmin = props.xyxy[0]
	const xmax = props.xyxy[2]
	const ymin = props.xyxy[1]
	const ymax = props.xyxy[3]

	const naturalWidth = props.naturalArea[0]
	const naturalHeight = props.naturalArea[1]

	const rawText = props.text

	return (
		<div>
			<Box className="text-region"
				position={'absolute'} 
				left	={ (xmin/naturalWidth)*100 + "%" } 
				width	={ ((xmax-xmin)/naturalWidth)*100 + "%" }
				top 	={ (ymin/naturalHeight)*100 + "%"}
				height	={ ((ymax-ymin)/naturalHeight)*100 + "%"}
			>
			</Box>
		</div>
		
	)
}
