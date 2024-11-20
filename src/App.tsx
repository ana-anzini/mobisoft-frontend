import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import "./App.sass";
import Supplier from './pages/supplier/Supplier';
import Navbar from "./components/navbar/NavBar";
import SideMenu from "./components/menu/SideMenu";
import Category from "./pages/category/Category";
import Product from "./pages/product/Product";
import Employees from "./pages/employees/Employees";
import Costumer from "./pages/costumer/Costumer";
import Deliveries from "./pages/deliveries/Deliveries";
import Project from "./pages/project/Project";
import NewProject from "./pages/project/NewProject";
import EditProject from "./pages/project/EditProject";
import Administration from "./pages/administration/Administration";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div id="main-container">
        <SideMenu />
        <Routes>
          <Route path="/suppliers" element={<Supplier />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/products" element={<Product />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/costumers" element={<Costumer />} />
          <Route path="/deliveries" element={<Deliveries />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/new-project" element={<NewProject />} />
          <Route path="/edit-project/:id" element={<EditProject />} />
          <Route path="/administration" element={<Administration />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;