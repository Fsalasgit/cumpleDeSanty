import { useState } from "react";

export default function PlayerForm({ avatarOptions, onAdd }) {
  const [newName, setNewName] = useState("");
  const [newAvatar, setNewAvatar] = useState(avatarOptions[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim()) return alert("Poné un nombre.");
    onAdd(newName, newAvatar);
    setNewName("");
    setNewAvatar(avatarOptions[0]);
  };

  return (
    <section className="form-section">
      <form onSubmit={handleSubmit} className="create-form">
        <input
          type="text"
          placeholder="Nombre del jugador"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <select value={newAvatar} onChange={(e) => setNewAvatar(e.target.value)}>
          {avatarOptions.map((src, i) => (
            <option key={i} value={src}>
              Avatar {i + 1}
            </option>
          ))}
        </select>
        <button type="submit">➕ Crear Jugador</button>
      </form>

      {newAvatar && (
        <div className="avatar-preview">
          <p>Vista previa:</p>
          <img src={newAvatar} alt="preview" className="avatar" />
        </div>
      )}
    </section>
  );
}
