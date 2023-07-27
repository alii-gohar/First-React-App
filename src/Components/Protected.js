import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = ({ Components }) => {
  const isUserLogin = JSON.parse(localStorage.getItem("login"));
  const navigate = useNavigate();
  useEffect(() => {
    console.log(isUserLogin, "login");
    if (isUserLogin === null) navigate("/");
  }, [isUserLogin, navigate]);
  return (
    <div>
      <Components />
    </div>
  );
};

export default Protected;
