import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import "./App.sass";
import Supplier from './pages/supplier/Supplier';
import Navbar from "./components/navbar/NavBar";
import SideMenu from "./components/menu/SideMenu";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div id="main-container">
        <SideMenu />
        <Routes>
          <Route path="/suppliers" element={<Supplier />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;