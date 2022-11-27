import Appbar from "./components/AppBar.js";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./store/auth.js";
import Cookie from "js-cookie";

function App() {
  const [isLoading, setisLoading] = useState(true);
  const dispatch = useDispatch();
  const token = Cookie.get("token");

  // check if jwt is valid
  const fetchUser = async () => {
    setisLoading(true);
    let res = await fetch(`${process.env.REACT_APP_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // if invalid,go to login page
    if (res.ok) {
      res = await res.json();
      dispatch(setUser(res.user));
    }
    setisLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchUser();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <Appbar />
      <Outlet />
    </div>
  );
}

export default App;
