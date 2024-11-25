import { ColorModeContext, useMode } from "../../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Team from "../Team/index";
import Products from "../Products";
import FAQ from "../FAQ";
import Bar from "../Bar";
import Pie from "../Pie";
import Line from "../Line";
import Category from "../Category/category";
import Brand from "../Brand/Brand";
import Invoices from "../Invoices";

const Admin = () => {
  const [theme, colorMode] = useMode();
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar />
            <main className="content">
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/products" element={<Products />} />
                <Route path="/category" element={<Category />} />
                <Route path="/brand" element={<Brand />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/invoices" element={<Invoices />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};
export default Admin;
