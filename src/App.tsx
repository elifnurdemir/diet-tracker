import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./components/pages/home/Home";
import { CssBaseline } from "@mui/material";
import { ColorModeContextProvider } from "./provider/ColorModeProvider";
import { UserProvider } from "./provider/UserProvider";
import { SnackbarProvider } from "./provider/SnackbarProvider";

import { WaterTracking } from "./components/pages/water-tracking/WaterTracking";
function App() {
  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <UserProvider>
        <SnackbarProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path={"/"} element={<Home />} />
                <Route path={"/water"} element={<WaterTracking />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </UserProvider>
    </ColorModeContextProvider>
  );
}

export default App;
