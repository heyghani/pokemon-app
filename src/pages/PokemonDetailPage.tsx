import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchPokemonDetail,
  catchPokemon,
  addPokemon,
} from "../redux/pokemonSlice";
import { RootState, AppDispatch } from "../redux/store";
import Loader from "../components/Loader";
import DetailCard from "../components/DetailCard";
import NicknameModal from "../components/NicknameModal";
import Modal from "../components/Modal";

const PokemonDetailPage: React.FC = () => {
  const navigation = useNavigate();
  const { name } = useParams<{ name: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { detail, loading, error } = useSelector(
    (state: RootState) => state.pokemon
  );

  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [catchError, setCatchError] = useState(false);

  useEffect(() => {
    dispatch(fetchPokemonDetail(name!));
  }, [dispatch, name]);

  const handleCatch = async () => {
    setCatchError(false);
    const success = await dispatch(catchPokemon()).unwrap();
    if (success) {
      setShowNicknameModal(true);
      setCatchError(false);
    } else {
      setCatchError(true);
    }
  };

  const handleSaveNickname = (nickname: string) => {
    if (nickname) {
      dispatch(addPokemon({ nickname, pokemon: detail! }));
      navigation("/my-pokemon");
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
          <p>{error}. Try again!</p>
          <button onClick={handleCatch} className="btn-primary">
            Retry
          </button>
        </div>
      </Modal>
    );
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto p-4">
      {detail && <DetailCard pokemon={detail} onCatch={handleCatch} />}
      {catchError && handleShowError()}
      <NicknameModal
        show={showNicknameModal}
        onClose={() => setShowNicknameModal(false)}
        onSave={handleSaveNickname}
        defaultName={detail?.name || ""}
      />
    </div>
  );
};

export default PokemonDetailPage;
