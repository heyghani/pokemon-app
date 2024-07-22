import React, { useState } from "react";
import Modal from "./Modal";

interface NicknameModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (nickname: string) => void;
  defaultName: string;
}

const NicknameModal: React.FC<NicknameModalProps> = ({
  show,
  onClose,
  onSave,
  defaultName,
}) => {
  const [nickname, setNickname] = useState(defaultName);

  const handleSave = () => {
    onSave(nickname);
    onClose();
  };

  return (
    <Modal show={show} onClose={onClose} title="Give your Pokémon a nickname">
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="text-input"
        />
        <button onClick={handleSave} className="btn-primary">
          Save
        </button>
      </div>
    </Modal>
  );
};

export default NicknameModal;
