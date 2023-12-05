import "./App.css";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { HomePage } from "./Components/HomePage";
import { Customers } from "./Components/Customers";
import { Accounts } from "./Components/Accounts";
import { Products } from "./Components/Products";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/customers" element={<Customers path="/customers" />} />
      <Route path="/accounts" element={<Accounts path="/accounts" />} />
      <Route path="/products" element={<Products path="/products" />} />
    </Routes>
  );
}

export default App;
