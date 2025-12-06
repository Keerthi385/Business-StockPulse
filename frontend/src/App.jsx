import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProductsPage from "./pages/ProductsPage";
import CreateProductPage from './pages/CreateProductPage';
import "./App.css";
import UpdatePage from "./pages/UpdatePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/create" element={<CreateProductPage />} />
        
        <Route path="/products/:id" element={<UpdatePage />} />
        
      </Routes>
    </div>
  );
}

export default App;
