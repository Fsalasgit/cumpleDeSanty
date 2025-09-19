import { useState } from "react";
import PlayerForm from "./PlayerForm";
import Modal from "./Modal";

export default function PlayerCreate({ avatarOptions, onAdd }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAdd = (name, avatar) => {
    onAdd(name, avatar);
    setIsOpen(false); // cerrar modal al crear
  };

  return (
    <>
      <button className="create-button" onClick={() => setIsOpen(true)}>
        Crear jugador
      </button>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <h2>Nuevo jugador</h2>
          <PlayerForm avatarOptions={avatarOptions} onAdd={handleAdd} />
        </Modal>
      )}
    </>
  );
}

