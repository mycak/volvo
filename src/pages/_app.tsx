import React from "react";
import { AppProps } from "next/app";
import { StyleProvider, ThemePicker } from "vcc-ui";
import "../styles/globals.css";
import { VehiclesContextProvider } from "../conext/VehiclesContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <StyleProvider>
        <ThemePicker variant="light">
          <VehiclesContextProvider>
            <Component {...pageProps} />
          </VehiclesContextProvider>
        </ThemePicker>
      </StyleProvider>
    </>
  );
}

export default App;
