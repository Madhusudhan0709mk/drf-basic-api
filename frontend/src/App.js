import AddProduct from "./Componenets/AddProduct";
import { ProductForm } from "./Componenets/ProductForm";
import Productup from "./Componenets/Productup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>

<BrowserRouter>
  <Routes>
      <Route path="/" element={<AddProduct />}> </Route>
      <Route path="/update" element={<Productup />}>
      </Route>
  </Routes>
</BrowserRouter>
<ProductForm />
    </>
  );
}

export default App;
