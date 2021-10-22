import { Box, Center, IconButton } from '@chakra-ui/react'
import React, { Component, useRef } from 'react'
import { Flex, HStack, VStack} from '@chakra-ui/layout'
import { AttachmentIcon } from '@chakra-ui/icons'
import './Reader.css'
import ChildMenuButton from 'src/global-components/MenuButtons/ChildMenuButton'
import TopMenuButton from 'src/global-components/MenuButtons/TopMenuButton'
declare var window: any;
export default class Reader extends Component {
    comic_folder_url:string = ""
    // fileSelector:HTMLInputElement = document.createElement('input')

    componentDidMount(){
        // initialize the input element
        // this.fileSelector.setAttribute('type', 'file');
        // this.fileSelector.setAttribute('value', '');
        // this.fileSelector.name = 'fileList'
        // this.fileSelector.setAttribute('directory', '');
        // this.fileSelector.setAttribute('webkitdirectory', '');

        // this.fileSelector.onchange = e => {
        //     let files = (e.target as HTMLInputElement).files
        //     alert( "Size : " + files?.item(0)?.size );
        // }
    }


    selectDirectory = () => {
        window.ipcRenderer.send('open-dir-dialog');
        // this.fileSelector.click();

    }

    render() {
        
        return (
            <Box h="32px" w={'100%'} bgColor="#343434"> 
                <Flex w={"100%"} h={"32px"} flexGrow={0} color="whiteAlpha.900">
                    <TopMenuButton menuName="File">
                        <ChildMenuButton name="Open Folder" onClick={()=>{this.selectDirectory()}}/>
                        <ChildMenuButton name="Open Recent" onClick={()=>{this.selectDirectory()}}/>
                        <ChildMenuButton name="Save Project" onClick={()=>{}}/> 
                        <ChildMenuButton name="Exit project" onClick={()=>{}}/>
                    </TopMenuButton>

                    <TopMenuButton menuName="Edit"> 
                    
                    </TopMenuButton>
                    
                    <TopMenuButton menuName="View">
                        <ChildMenuButton name="Fullscreen" onClick={()=>{}}/>
                    </TopMenuButton>

                    <TopMenuButton menuName="About" onClick={()=>{}}>
                    
                    </TopMenuButton>
                </Flex>
            </Box>

        )
    }
}
