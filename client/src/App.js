import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import CallHistory from "./Components/CallHistory";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<CallHistory />}></Route>
      
      </Routes>
    </>
  );
}

export default App;
