import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPokemons } from "../redux/pokemonSlice";
import { RootState, AppDispatch } from "../redux/store";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const PokemonListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading } = useSelector((state: RootState) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="page-title">Pokémon List</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="container-list">
          {list.map((pokemon) => (
            <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name}>
              <div className="card-list">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                    pokemon.url.split("/")[6]
                  }.png`}
                  alt={pokemon.name}
                  className="card-image"
                />
                <h2 className="text-card">{pokemon.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonListPage;
