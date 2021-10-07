import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react" // Required by Chakra UI
import logo from './logo.svg';
import { Box, Text } from "@chakra-ui/layout";
import './App.css';
import TitleBar from "./global-components/TitleBar";
import SideBar from "./global-components/SideBar";

function App() {
    return(
        <ChakraProvider>
            <TitleBar />
            <SideBar />
        </ChakraProvider>
    )
}
export default App;
