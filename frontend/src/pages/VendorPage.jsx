import { useNavigate } from "react-router";

const VendorPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button className="mr-4" onClick={() => navigate("/vendor-login")}>
        Login
      </button>
      <button onClick={() => navigate("/vendor-signup")}>Signup</button>
    </div>
  );
};

export default VendorPage;
