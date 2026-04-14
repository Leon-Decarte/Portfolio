import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import FluidCursor from "./components/FluidCursor";
import GridBackground from "./components/GridBackground";
import CursorDot from "./components/CursorDot";
import DotGrid from "./components/DotGrid";
import AnimatedDotBackground from "./components/AnimatedDotBackground";

function App() {
  
  return (
    <BrowserRouter>
      <AnimatedDotBackground />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;