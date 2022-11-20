import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Loader = () => {
  const navigate = useNavigate();

  const [count, setCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    count === 0 && navigate("/login");

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="flex justify-center items-center">
      You are not logged in. Please login to access this page, redirecting you
      to login page in {count} seconds
    </div>
  );
};

export default Loader;
