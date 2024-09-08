import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../theme";

import { Sidebar } from "./components/sidebar";

export const metadata = {
  title: "Unified UI",
  description: "Frontend for all my projects",
};



export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '350px' }}>
              <Sidebar />
            </div>
            <div style={{ flex: 1, margin: 20, marginTop: 100 }}>
              {children}
            </div>
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
