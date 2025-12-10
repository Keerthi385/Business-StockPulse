import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CreateProductPage from './pages/CreateProductPage';
import VendorPage from "./pages/VendorPage";
import AgentPage from "./pages/AgentPage";
import VendorLoginPage from "./pages/VendorLoginPage";
import VendorSignupPage from "./pages/VendorSignupPage";
import AgentLoginPage from "./pages/AgentLoginPage";
import AgentSignupPage from "./pages/AgentSignupPage";
import AgentOrdersPage from "./pages/AgentOrdersPage";
import AvailableOrdersPage from "./pages/AvailableOrdersPage";
import UpdatePage from "./pages/UpdatePage";
import VendorOrdersPage from "./pages/VendorOrdersPage";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/agent" element={<AgentPage />} />
        <Route path="/vendor" element={<VendorPage />} />
        <Route path="/vendor-login" element={<VendorLoginPage />} />
        <Route path="/agent-login" element={<AgentLoginPage />} />
        <Route path="/vendor-signup" element={<VendorSignupPage />} />
        <Route path="/agent-signup" element={<AgentSignupPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/create" element={<CreateProductPage />} />
        <Route path="/products/:id" element={<UpdatePage />} />
        <Route path="/vendor-orders" element={<VendorOrdersPage/>}/>
        <Route path="/agent-orders" element={<AvailableOrdersPage/>}/>
        <Route path="/agent-my-orders" element={<AgentOrdersPage/>}/>

        
      </Routes>
    </div>
  );
}

export default App;
