import { Box, Center, IconButton } from '@chakra-ui/react'
import React, { Component, useRef } from 'react'
import { Flex, HStack, VStack} from '@chakra-ui/layout'
import { AttachmentIcon } from '@chakra-ui/icons'
import './Reader.css'
import ChildMenuButton from 'src/global-components/MenuButtons/ChildMenuButton'
import TopMenuButton from 'src/global-components/MenuButtons/TopMenuButton'
export default class Reader extends Component {
    
    comic_folder_url:string = ""
    fileSelector:HTMLInputElement = document.createElement('input')

    componentDidMount(){
        // initialize the input element
        this.fileSelector.setAttribute('type', 'file');
        this.fileSelector.setAttribute('name', 'fileList');
        this.fileSelector.setAttribute('webkitdirectory', 'multiple');
        this.fileSelector.setAttribute('multiple', 'multiple');

        this.fileSelector.onchange = (e) => {alert("change event")}

        this.fileSelector.addEventListener('change', e=>{
            alert("CHANGE EVENT")
            let files = (e.target as HTMLInputElement).files
            alert(files);
            // for (let file of Array.from(files)) {
            //     alert(file)
                // let item = document.createElement('li');
                // item.textContent = file.webkitRelativePath;
                // listing.appendChild(item);
            // };
        })
    }


    selectFiles = () => {
        this.fileSelector.value="";
        this.fileSelector.click();
    }

    render() {
        
        return (
            <Box h="32px" w={'100%'} bgColor="#343434"> 
                <Flex w={"100%"} h={"32px"} flexGrow={0} color="whiteAlpha.900">
                    <TopMenuButton menuName="File">
                        <ChildMenuButton name="Open Folder" onClick={()=>{this.selectFiles()}}/>
                        <ChildMenuButton name="Open Recent" onClick={()=>{this.selectFiles()}}/>
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
