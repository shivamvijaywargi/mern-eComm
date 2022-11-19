import { useAuth } from "../context/authContext";

const Home = () => {
  const [auth, setAuth] = useAuth();

  return <div>{JSON.stringify(auth)}</div>;
};

export default Home;
