import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, IconButton } from '@chakra-ui/react'
import React from 'react'
import Draggable from 'react-draggable';
import { popupProps } from './types';


declare var window: any;
export default function WordPopup(props:popupProps) {

  const ipcSendNote = () => {
    window.ipcRenderer.send("addNote", {
      "word":props.token, 
      "pos":props.pos,
      "definitions":props.definitions.join("\n"),
      "sentence":props.sentence,
      "panelRegion":props.panelRegion,
      "base64Image":props.base64Image,

    })
  }

  return (
    <Draggable>
      <Box  className="popup"
      backgroundColor={"#fafafa"} position={'absolute'} left={'50%'} top={'50%'}
      >
        <div>
          <span className="popup-word">{props.token}</span>
          <IconButton aria-label='Search database' icon={<AddIcon/>} isRound={true} colorScheme={'green'} size="xs" 
          onClick={ipcSendNote}
          />
          <h3 className="popup-pos">{props.pos}</h3>
        </div>
        <hr></hr>
        <h2 className='popup-sentence'>{props.sentence}</h2>
        <h2 className='popup-definition'>{props.definitions}</h2>
      </Box>
    </Draggable>
  )
}
