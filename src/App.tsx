import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Normal from "./Components/Normal";
import Normal3 from "./Components/Normal3";
import Line from "./Components/Line";

function App() {
  return (
    <div className="App">
      <div className="rr-block">
        <Link to="/">两位数</Link> ｜<Link to="n3">三位数</Link>｜
        <Link to="line">分解</Link>
      </div>
      <Routes>
        <Route path="/" element={<Normal />} />
        <Route path="n3" element={<Normal3 />} />
        <Route path="line" element={<Line />} />
      </Routes>
    </div>
  );
}

export default App;
