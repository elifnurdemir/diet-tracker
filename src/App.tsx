import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./components/pages/home/Home";
import { CssBaseline } from "@mui/material";
import { ColorModeContextProvider } from "./provider/ColorModeProvider";

function App() {
  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={"/"} element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ColorModeContextProvider>
  );
}

export default App;
