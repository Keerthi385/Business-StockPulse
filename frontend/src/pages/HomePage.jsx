import { useNavigate } from "react-router";

const HomePage = () => {

  const navigate = useNavigate();

  return (
    <div >
      <h1>About our website</h1>
      <button className="mr-4" onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/signup")}>Signup</button>
    </div>
  );
};

export default HomePage;
