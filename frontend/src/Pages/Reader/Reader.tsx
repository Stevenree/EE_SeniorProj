import { Box, Center, IconButton } from '@chakra-ui/react'
import React, { Component, useCallback, useEffect, useReducer, useRef } from 'react'
import { Flex, HStack, VStack} from '@chakra-ui/layout'
import { AttachmentIcon } from '@chakra-ui/icons'
import './Reader.css'
import ChildMenuButton from 'src/global-components/MenuButtons/ChildMenuButton'
import TopMenuButton from 'src/global-components/MenuButtons/TopMenuButton'
import useKeyboardShortcut from './use-keyboard-shortcut'

declare var window: any;


export default function Reader() {
    const [page_urls, setUrls] = React.useState([""]);
    const [page_count, setCount]  = React.useState(0);
    const [cur_page, setPage] = React.useState(0);

    useKeyboardShortcut(["ArrowLeft"], 
        () => { if (cur_page > 0) setPage(cur_page - 1)}
    )
    useKeyboardShortcut(["ArrowRight"], 
        ()=>{ if (cur_page < page_count-1) setPage(cur_page + 1)}
    )


    useEffect( () => {
        window.ipcRenderer.on(
            'nested-images-base64', (event:any, base64:string[]) => {
                setUrls(base64);
                setCount(base64.length);
                setPage(0);
            }
        )
    }, [])

    const selectDirectory = () => {
        // alert(this.state.page_urls)
        window.ipcRenderer.send('open-dir-dialog');
    }

    const renderPage = () => {
        return (<>
            {page_urls ? 
                <img src={`data:image/png;base64,${page_urls[cur_page]}`} alt={`NOT WORKING!`} /> : 
                <>URL IS NULL!</>
            }
            </>
        )
    }

    return (
        <Box w="100%">
            <Box h="32px" w={'100%'} bgColor="#343434"> 
                <Flex w={"100%"} h={"32px"} flexGrow={0} color="whiteAlpha.900">

                    <TopMenuButton menuName="File">
                        <ChildMenuButton name="Open Folder" onClick={()=>{selectDirectory()}}/>
                        <ChildMenuButton name="Open Recent" onClick={()=>{selectDirectory()}}/>
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
        {renderPage()}
        <div> {`Current Page: ${cur_page} / ${page_count-1}`} </div>
        </Box>
    )
}
