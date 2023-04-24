import * as React from "react";
import * as ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import theme from "./theme/theme";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
