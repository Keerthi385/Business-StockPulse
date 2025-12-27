import { createContext, useContext, useState } from "react";

const AgentContext = createContext();

export const AgentProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [connections, setConnections] = useState([]);

  return (
    <AgentContext.Provider
      value={{ orders, setOrders, connections, setConnections }}
    >
      {children}
    </AgentContext.Provider>
  );
};

export const useAgent = () => useContext(AgentContext);
  