import React from "react";
import { Pokemon } from "../types/pokemon";
import { getTypeColor } from "../utils/colorUtils";

interface PokemonCardProps {
  pokemon: Pokemon;
  onCatch: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onCatch }) => {
  const typeColor = (type: string) => {
    return getTypeColor(type);
  };

  return (
    <div className={"card-detail"}>
      <h1 className="text-name">{pokemon.name}</h1>

      <img
        src={pokemon.sprites.other?.["official-artwork"]?.front_default}
        alt={pokemon.name}
        className="detail-image"
      />
      <div className="flex-1">
        <div className="mb-4">
          <h2 className="text-detail">Types</h2>
          <div className="flex flex-wrap gap-2">
            {pokemon.types.map((type) => (
              <div
                key={type.type.name}
                className={"rounded-full px-4 py-1 text-white"}
                style={{ backgroundColor: typeColor(type.type.name) }}
              >
                {type.type.name}
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-detail">Moves</h2>
          <div className="flex flex-wrap gap-2">
            {pokemon.moves.map((move, index) => (
              <div key={index} className="detail-box">
                {move.move.name}
              </div>
            ))}
          </div>
        </div>
        <button onClick={onCatch} className="btn-primary">
          Catch Pokémon
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
