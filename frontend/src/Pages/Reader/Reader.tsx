import { Box, Center, IconButton } from '@chakra-ui/react'
import React, { Component, useRef } from 'react'
import { Flex, HStack, VStack} from '@chakra-ui/layout'
import { AttachmentIcon } from '@chakra-ui/icons'
import './Reader.css'
import ChildMenuButton from 'src/global-components/MenuButtons/ChildMenuButton'
import TopMenuButton from 'src/global-components/MenuButtons/TopMenuButton'
declare var window: any;

type ReaderState = {
    image_urls: string[]|null
}
export default class Reader extends Component {

    state:ReaderState = {
        image_urls: null

    }

    componentDidMount(){
        window.ipcRenderer.on('directory-nested-file-paths', (event:any, paths:string[])=>{
            this.setState({image_urls: paths})
        })
    }

    selectDirectory = () => {
        // alert(this.state.image_urls)
        window.ipcRenderer.send('open-dir-dialog');
    }


    render() {
        return (
            <Box w="100%">
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
                <img src={""} alt={'nope'} />
                {this.renderComicPage(0)}
            </Box>
        )
    }

    private renderComicPage(index:number){
        return (<>
            {this.state.image_urls ? 
                <img src={"file:///"+this.state.image_urls[index]} alt={"url doesnt work"} /> : 
                <>URL IS NULL!</>
            }
            </>
        )
    }
}
