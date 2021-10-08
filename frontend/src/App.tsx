// @ts-nocheck
import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react" // Required by Chakra UI
import { Box, Flex } from "@chakra-ui/layout";
import './App.css';
import TitleBar from "./global-components/TitleBar";
import SideBar from "./global-components/SideBar";

function App() {
    document.body.style.height='100%';
    document.body.style.width='100%';
    document.body.style.margin="0px";


    return(
        <ChakraProvider>
            <Flex flexFlow="column" height={'100%'}>    
                <TitleBar />
                    
                {/* Container body for the rest of the application */}
                <Box 
                    bgColor={"green.50"} 
                    flexGrow={1} 
                    flexShrink={1} 
                    flexBasis={'auto'}
                >   
                    <SideBar/>
                </Box>
            </Flex>

        </ChakraProvider>
    )
}
export default App;
