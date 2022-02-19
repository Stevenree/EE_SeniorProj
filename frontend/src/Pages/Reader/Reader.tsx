import { Box, Center, IconButton, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Flex, VStack} from '@chakra-ui/layout'
import { AttachmentIcon } from '@chakra-ui/icons'
import './Reader.css'
import ChildMenuButton from 'src/global-components/MenuButtons/ChildMenuButton'
import TopMenuButton from 'src/global-components/MenuButtons/TopMenuButton'
import useKeyboardShortcut from './use-keyboard-shortcut'
import upArrow from 'src/assets/upArrow.png'
import TextRegion from './TextRegion'

declare var window: any;

type page = {
    base64 : string,
    width: number,
    height: number,
}

export default function Reader() {
    const [pages, setPages] = React.useState([ {"base64":"", "width":0, "height":0} ]);
    const [pageWidth, setPageWidth] = React.useState(800)
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
            'post-manga-folder', (event:any, pages:page[]) => {
                setPages(pages);
                // console.log(base64[0].width)
                setCount(pages.length);
                setPage(0);
            }
        )
    }, [])

    const selectDirectory = () => {
        // alert(this.state.pages)
        window.ipcRenderer.send('open-dir-dialog');
    }

    const renderPage = () => {
        return ( 
            <Center marginTop="25px">
                { pages[0].base64!== "" 
                    ? <div className="image-container" 
                        onWheel={(e) => {
                            if (e.ctrlKey)
                                if ( e.deltaY>0 )   setPageWidth(pageWidth+50)
                                else                setPageWidth(pageWidth-50)
                        }}
                    >
                        {/* <TextRegion 
                            xyxy={ [664, 458, 722, 676] } 
                            naturalArea={ [ pages[cur_page].width, pages[cur_page].height ]} 
                            rawText={"準備OK!!"}
                        /> */}
                        <TextRegion 
                            xyxy={ [420,200,510,300] } 
                            naturalArea={ [ pages[cur_page].width, pages[cur_page].height ]} 
                            rawText={"お願い"}

                        />
                        {/* <TextRegion 
                            xyxy={ [1222,871,1260,947] } 
                            naturalArea={ [ pages[cur_page].width, pages[cur_page].height ]} 
                            rawText={"ではさっそく"}
                        />
                        <TextRegion 
                            xyxy={ [1144,561,1263,677] } 
                            naturalArea={ [ pages[cur_page].width, pages[cur_page].height ]} 
                            rawText={"つ…ついに買ったのね！！　ビカビカのひとり用炊飯器を！！"}
                        /> */}
                        <img 
                            width={pageWidth}
                            src={`data:image/png;base64,${pages[cur_page].base64}`} 
                            alt={`NOT WORKING!`} 
                            className={"page"}
                            id={'page'}
                        />
                    </div> 
                    : <VStack>
                        <IconButton 
                            aria-label="load-comic" 
                            icon={<AttachmentIcon boxSize="50px"/>} 
                            onClick={selectDirectory} 
                            marginTop={"0px"} bgColor="orange.300"  boxSize="100px"
                            _hover={{backgroundColor: "orange.400"}}
                            borderRadius="100px"
                        />
                        <img src={upArrow} alt={"^"} />   
                        <Text color="blackAlpha.600" userSelect='none'> Begin by uploading your comic above! </Text>
                    </VStack>
                }
            </Center>
        )
    }
    
    const renderPageCount = () => {
        return (
            <Center>
                <div>{ pages[0].base64 !=="" 
                    ? `${cur_page} / ${page_count-1}` 
                    : ``
                }
                </div>
                {/* <div>
                    { pages[0].base64 !=="" 
                        ? `Native Res: ${pages[cur_page].width} x ${pages[cur_page].height}` 
                        : ``
                    }
                </div> */}
            </Center>
        )
    }

    return (
        <Box w="100%" h="100%" overflowY="hidden" bgColor="#fdfffc">
            <Box h="32px" w={'100%'} bgColor="#343434"> 
                <Flex w={"100%"} h={"32px"} flexGrow={0} color="whiteAlpha.900">

                    <TopMenuButton menuName="File">
                        <ChildMenuButton name="Open Folder" onClick={selectDirectory}/>
                        <ChildMenuButton name="Open Recent" onClick={selectDirectory}/>
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
        {renderPageCount()}

        </Box>
    )
}
