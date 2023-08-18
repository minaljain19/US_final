import logo from "./logo.svg";
import Grid from "@mui/material/Grid";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import CallHistory from "./components/CallHistory";
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
