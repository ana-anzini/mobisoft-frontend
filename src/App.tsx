import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import "./App.sass"
import Supplier from './pages/supplier/Supplier';
import SideMenu from "./components/menu/SideMenu";
import Navbar from "./components/navbar/NavBar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div id="main-container">
        <SideMenu />
        <Routes>
          <Route path="/">
            <Route path="suppliers" element={<Supplier />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
