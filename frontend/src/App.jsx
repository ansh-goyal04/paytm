
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import Dashboard from "./pages/dashboard";
import SendMoney from "./pages/SendMoney";

function App() {

  return <>
  <BrowserRouter>
  <Routes>
    <Route path="/signin" element={<SignIn/>} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path="/dashboard" element={<Dashboard/>} /> 
    <Route path="/send" element={<SendMoney/>} />
  </Routes>
  </BrowserRouter>

  
  </>
}

export default App
