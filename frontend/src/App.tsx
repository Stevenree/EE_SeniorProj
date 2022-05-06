// @ts-nocheck
import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react" // Required by Chakra UI
import { Box, Flex } from "@chakra-ui/layout";
import './App.css';
import TitleBar from "./global-components/TitleBar";
import SideBar from "./global-components/SideBar";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom"
import Reader from "./Pages/Reader/Reader.tsx";
import Home from "./Pages/Home.tsx";

function App() {
    document.body.style.height='100%';
    document.body.style.width='100%';
    document.body.style.margin="0px";


    return(
        <ChakraProvider>
            <Flex flexFlow="column" height={'100%'}>    
                <TitleBar />
                <Box height={35}></Box>
                    
                {/* Container body for the rest of the application */}
                <Box bgColor={"green.50"} flexGrow={1} flexShrink={1} flexBasis={'auto'}>   
                    <Flex flexFlow="row" w={'100%'} h={'100%'}>
                
                        <SideBar/>
                        
                        {/* Now we need to render the actual page that we've routed */}
                        <Router>
                            <Switch>
                                <Route exact path="/reader" component={Reader} />
                                <Route exact path="/" component={Home}/>
                            </Switch>
                        </Router>

                    </Flex>
                </Box>
                
            </Flex>

        </ChakraProvider>
    )
}
export default App;
