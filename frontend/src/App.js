import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react" // Required by Chakra UI
import logo from './logo.svg';
import { Box, Text } from "@chakra-ui/layout";
import Header from "./global-components/Header";
import './App.css';
import TitleBar from "./global-components/TitleBar";

function App() {
    return(
        <ChakraProvider>
            <TitleBar />
        </ChakraProvider>
    )
}
export default App;
