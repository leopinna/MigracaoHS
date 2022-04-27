import { render } from "react-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import App from "./App";

const theme = extendTheme({
  config: {
    initialColorMode: "dark"
  }
});

const index = (
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);

const rootElement = document.getElementById("root");
render(index, rootElement);
