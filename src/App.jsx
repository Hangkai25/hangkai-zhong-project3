import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

import Home from "./pages/Home.jsx";
import GameSelect from "./pages/GameSelect.jsx";
import Game from "./pages/Game.jsx";
import Rules from "./pages/Rules.jsx";
import Scores from "./pages/Scores.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<GameSelect />} />
        <Route path="/game/:gameId" element={<Game />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/scores" element={<Scores />} />
      </Routes>
    </>
  );
}
