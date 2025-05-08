import React from 'react'
import { Routes,Route } from 'react-router-dom';
//import Home from './pages/home';
import Home from "./pages/Home.jsx";
import "./index.css";
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product.jsx'
import Cart from './pages/Cart'
import Login from './pages/Login';
import Orders from './pages/Orders';
import Placeorder from './pages/Placeorder'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer, toast } from "react-toastify";
import Verify from './pages/Verify';
import "react-toastify/dist/ReactToastify.css";
//import Add from '../Add.jsx';
//import Add from "../../admin/ecommerce/src/pages/Add";
console.log(toast);

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<Placeorder />} />
        <Route path="/orders" element={<Orders />} />
        /<Route path="/verify" element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  );
}/**/

export default App
