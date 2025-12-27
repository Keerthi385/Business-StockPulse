import { createContext, useContext, useState } from "react";

const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [connections, setConnections] = useState([]);

  return (
    <VendorContext.Provider
      value={{ orders, setOrders, connections, setConnections }}
    >
      {children}
    </VendorContext.Provider>
  );
};

export const useVendor = () => useContext(VendorContext);
