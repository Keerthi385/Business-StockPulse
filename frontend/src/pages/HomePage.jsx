import { Link } from "react-router";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Business Agent</h1>
      <p>Created By Team : Sankalp</p>
      <h2>Identify yourself</h2>
      <Link to={"/agent"}>Agent</Link>
      <Link to={"/vendor"}>Vendor</Link>
    </div>
  );
};

export default HomePage;
