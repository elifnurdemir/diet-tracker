import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./components/pages/home/Home";
import { CssBaseline } from "@mui/material";
import { UserProvider } from "./provider/UserProvider";
import { SnackbarProvider } from "./provider/SnackbarProvider";
import { WaterTracking } from "./components/pages/water-tracking/WaterTracking";
import { CustomThemeProvider } from "./ThemeContext";
import { MealTracking } from "./components/pages/meal-tracking/MealTracking";
import WeightTracking from "./components/pages/weight-tracking/WeightTracking";
import GymTracking from "./components/pages/gym-tracking/GymTracking";

function App() {
  return (
    <CustomThemeProvider>
      <CssBaseline />
      <UserProvider>
        <SnackbarProvider>
          <BrowserRouter basename="/diet-tracker">
            <Routes>
              <Route element={<Layout />}>
                <Route path={"/"} element={<Home />} />
                <Route path={"/water"} element={<WaterTracking />} />
                <Route path={"/gym"} element={<GymTracking />} />
                <Route path={"/meal"} element={<MealTracking />} />
                <Route path={"/weight"} element={<WeightTracking />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </UserProvider>
    </CustomThemeProvider>
  );
}

export default App;
