import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonListPage from "./pages/PokemonListPage";
import PokemonDetailPage from "./pages/PokemonDetailPage";
import MyPokemonListPage from "./pages/MyPokemonListPage";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PokemonListPage />} />
        <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
        <Route path="/my-pokemon" element={<MyPokemonListPage />} />
      </Routes>
    </Router>
  );
};

export default App;
