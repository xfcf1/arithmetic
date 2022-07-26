import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Normal from "./Components/Normal";
import Line from "./Components/Line";

function App() {
  return (
    <div className="App">
      <div className="rr-block">
        <Link to="/">Normal</Link> ｜<Link to="line">Line</Link>
      </div>
      <Routes>
        <Route path="/" element={<Normal />} />
        <Route path="line" element={<Line />} />
      </Routes>
    </div>
  );
}

export default App;
