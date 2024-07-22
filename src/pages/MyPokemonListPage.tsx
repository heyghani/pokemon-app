import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  removePokemon,
  renamePokemon,
  releasePokemon,
  renamePokemonThunk,
} from "../redux/pokemonSlice";
import Modal from "../components/Modal";
import Loader from "../components/Loader";

const MyPokemonListPage: React.FC = () => {
  const { myPokemons, loading } = useSelector(
    (state: RootState) => state.pokemon
  );
  const dispatch = useDispatch<AppDispatch>();
  const [catchError, setCatchError] = useState(false);
  const [errMessage, setErrorMessage] = useState("");

  const handleRelease = async (nickname: string) => {
    const response = await dispatch(releasePokemon()).unwrap();
    if (response.success) {
      dispatch(removePokemon(nickname));
    } else {
      setCatchError(true);
      setErrorMessage(
        `Failed to release Pokémon! Random number: ${response.number}`
      );
    }
  };

  const handleRename = async (nickname: string) => {
    const pokemon = myPokemons.find((p) => p.nickname === nickname);
    if (pokemon) {
      const response = await dispatch(
        renamePokemonThunk({ name: nickname, count: pokemon.renameCount })
      ).unwrap();
      const newName = `${nickname.split("-")[0]}-${response}`;
      dispatch(renamePokemon({ oldNickname: nickname, newNickname: newName }));
    }
  };

  const handleShowError = () => {
    return (
      <Modal
        show={catchError}
        title="Opps!"
        onClose={() => setCatchError(false)}
      >
        <div className="mt-4">
          <p>{errMessage}</p>
          <button onClick={() => setCatchError(false)} className="btn-primary">
            Close
          </button>
        </div>
      </Modal>
    );
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto p-4">
      {catchError && handleShowError()}
      <h1 className="page-title">My Pokémon List</h1>
      <div className="container-my-list">
        {myPokemons.map(({ nickname, pokemon }) => (
          <div key={nickname} className="card-my-list">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="card-image"
            />
            <h2 className="text-card">{nickname}</h2>
            <div className="flex justify-around">
              <button
                onClick={() => handleRelease(nickname)}
                className="btn-secondary"
              >
                Release
              </button>
              <button
                onClick={() => handleRename(nickname)}
                className="btn-primary"
              >
                Rename
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPokemonListPage;
