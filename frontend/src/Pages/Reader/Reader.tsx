import { Box, Center, IconButton, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Flex, VStack } from '@chakra-ui/layout'
import { AttachmentIcon } from '@chakra-ui/icons'
import './Reader.css'
import ChildMenuButton from 'src/global-components/MenuButtons/ChildMenuButton'
import TopMenuButton from 'src/global-components/MenuButtons/TopMenuButton'
import useKeyboardShortcut from './use-keyboard-shortcut'
import upArrow from 'src/assets/upArrow.png'
import TextRegion from './TextRegion'
import WordPopup from './WordPopup'

declare var window: any;

type page = {
  base64: string,
  width: number,
  height: number,
  boxes: box[],
}

type panelRegion = {
  xmin: number,
  ymin: number,
  xmax: number,
  ymax: number,
}

type box = {
  xmin: number,
  ymin: number,
  xmax: number,
  ymax: number,
  text: word[],
  panel: panelRegion,
}

type word = {
  token: string,
  lemma: string,
  definitions: string[],
}

export default function Reader() {
  const [pages, setPages] = React.useState([{ 
    "base64": "", 
    "width": 0, 
    "height": 0, 
    "boxes":[{
      'xmin':0, 
      'ymin':0, 
      'xmax':0, 
      'ymax':0, 
      'text':[{'token':''}]
      }] 
  }]);

  const [pageWidth, setPageWidth] = React.useState(800)
  const [page_count, setCount] = React.useState(0);
  const [cur_page, setPage] = React.useState(0);

  // Popup states that will be sent back up to the parent
  const [showPopup, setShowPopup] = React.useState(false)
  const [token, setToken] = React.useState('INIT TOKEN')
  const [definitions, setDefinitions] = React.useState(['DEFINITION GOES HERE'])
  const [sentence, setSentence] = React.useState('INIT SEN')
  const [panelRegion, setPanelRegion] = React.useState({'xmin':0,'ymin':0,'xmax':0,'ymax':0})

  // const functions to wrap the set state functions so its usable as component params
  const togglePopup = () => {
    showPopup ? setShowPopup(false) : setShowPopup(true)
  }

  const newPageReset = () => {
    setShowPopup(false)
  }
  
  useKeyboardShortcut(["ArrowLeft"],
    () => { 
      if (cur_page > 0) setPage(cur_page - 1) 
      newPageReset()
    }
  )

  useKeyboardShortcut(["ArrowRight"],
    () => { 
      if (cur_page < page_count - 1) setPage(cur_page + 1) 
      newPageReset()
    }
  )

  // initialize the IPC listener
  useEffect(() => {
    window.ipcRenderer.on(
      'post-manga-folder', (event: any, pages: page[]) => {
        setPages(pages);
        console.log(pages[0])
        setCount(pages.length);
        setPage(0);
      }
    )
  }, [])

  const renderPopup = () => <WordPopup 
    token={token} 
    definitions={definitions} 
    sentence={sentence} 
    panelRegion={panelRegion} 
    base64Image={pages[cur_page].base64} 
  />

  const selectDirectory = () => {
    // alert(this.state.pages)
    window.ipcRenderer.send('open-dir-dialog');
  }

  const renderBoxes = () => {
    return pages[cur_page].boxes.map( (box:any, i) => {
      console.log(box);
      return(
        <TextRegion
          xyxy={[box.xmin, box.ymin, box.xmax, box.ymax]}
          naturalArea={[pages[cur_page].width, pages[cur_page].height]}
          panelRegion={box.panelRegion}
          tokens={box.text}
          setToken={setToken}
          setDefinition={setDefinitions}
          setSentence={setSentence}
          togglePopup={togglePopup}
          setPanelRegion={setPanelRegion}
        />
      )
    })
  }

  const renderPage = () => {
    return (
      <Center marginTop="25px">
        {pages[0].base64 !== ""
          ? <div className="image-container"
            onWheel={(e) => {
              if (e.ctrlKey)
                if (e.deltaY > 0) setPageWidth(pageWidth + 50)
                else setPageWidth(pageWidth - 50)
            }}
          >
            {renderBoxes()}
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
              icon={<AttachmentIcon boxSize="50px" />}
              onClick={selectDirectory}
              marginTop={"0px"} bgColor="orange.300" boxSize="100px"
              _hover={{ backgroundColor: "orange.400" }}
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
        <div>{pages[0].base64 !== ""
          ? `${cur_page} / ${page_count - 1}`
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
    <Box w="100%" h="100%" overflowY="hidden" bgColor="#fdfffc" id='reader'>
      <Box h="32px" w={'100%'} bgColor="#343434">
        <Flex w={"100%"} h={"32px"} flexGrow={0} color="whiteAlpha.900">

          <TopMenuButton menuName="File">
            <ChildMenuButton name="Open Folder" onClick={selectDirectory} />
            <ChildMenuButton name="Open Recent" onClick={selectDirectory} />
            <ChildMenuButton name="Save Project" onClick={() => { }} />
            <ChildMenuButton name="Exit project" onClick={() => { }} />
          </TopMenuButton>

          <TopMenuButton menuName="Edit">
          </TopMenuButton>

          <TopMenuButton menuName="View">
            <ChildMenuButton name="Fullscreen" onClick={() => { }} />
          </TopMenuButton>

          <TopMenuButton menuName="About" onClick={() => { }}>
          </TopMenuButton>
        </Flex>

      </Box>
      { showPopup ? renderPopup() : <></>}
      {renderPage()}
      {renderPageCount()}

    </Box>
  )
}
