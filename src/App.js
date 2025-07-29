import {BrowserRouter,Route, Routes} from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard.jsx";
import Landing from "./Landing/index.jsx";
import SignUp from "./SignUp/SignUp.jsx";
import Login from "./Login/Login";
import Short from "./Short/Sho.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/short" element={<Short/>}/>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/Signup" element={<SignUp/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
