"use client"
import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";
import { TokenContext } from "@/context";
import { usePersistantState } from "@/hooks";

export default function RootLayout(props) {
  const [token, setToken] = usePersistantState("api_token", null);
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <TokenContext.Provider value={{ token, setToken }}>
              <CssBaseline />
              {props.children}
            </TokenContext.Provider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
