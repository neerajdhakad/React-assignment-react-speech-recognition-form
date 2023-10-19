import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./components/Add";
import Read from "./components/Read";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Add />}/>
          <Route path="/all" element={<Read />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
