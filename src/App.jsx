import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./components/Product";
import Carts from "./components/Carts";
import Header from "./components/Header";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/cart" element={<Carts />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
