import Appbar from "./components/AppBar.js";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Appbar />
      <Outlet />
    </div>
  );
}

export default App;
