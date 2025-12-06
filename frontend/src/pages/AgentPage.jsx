import React from 'react'
import { useNavigate } from 'react-router'

const AgentPage = () => {
    const navigate = useNavigate();
  return (
    <div>
        <button className="mr-4" onClick={() => navigate("/agent-login")}>Login</button>
      <button onClick={() => navigate("/agent-signup")}>Signup</button>
        
    </div>
  )
}

export default AgentPage