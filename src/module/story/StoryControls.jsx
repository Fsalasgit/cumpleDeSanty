import { useState, useEffect } from "react";
import StoryEngine from "./StoryEngine";

export default function StoryControls({ players }) {
  const [selectedPlayerId, setSelectedPlayerId] = useState("");
  const [storyStarted, setStoryStarted] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // Cargar selección previa si existe
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("storyPlayers")) || [];
    if (saved.length > 0) {
      setSelectedPlayer(saved[0]);
      setSelectedPlayerId(saved[0].id);
    }
  }, []);

  // Guardar selección en localStorage
  useEffect(() => {
    if (selectedPlayer) {
      localStorage.setItem("storyPlayers", JSON.stringify([selectedPlayer]));
    } else {
      localStorage.removeItem("storyPlayers");
    }
  }, [selectedPlayer]);

  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedPlayerId(id);
    const player = players.find((p) => String(p.id) === id);
    setSelectedPlayer(player || null);
  };

  const resetStory = () => {
    setSelectedPlayer(null);
    setSelectedPlayerId("");
    setStoryStarted(false);
    localStorage.removeItem("storyPlayers");
  };

  const startStory = () => {
    if (!selectedPlayer) return alert("Elegí un niño para comenzar.");
    setStoryStarted(true);
  };

  if (storyStarted) {
    return <StoryEngine players={[selectedPlayer]} onReset={resetStory} />;
  }

  return (
    <div className="story-controls">
      <h2>Seleccioná el niño para la historia</h2>

      <select value={selectedPlayerId} onChange={handleSelect}>
        <option value="">-- Elegí un niño --</option>
        {players.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <div className="controls-buttons" style={{ marginTop: 16 }}>
        <button onClick={startStory} disabled={!selectedPlayer}>
          🚀 Comenzar historia
        </button>
        <button onClick={resetStory} style={{ marginLeft: 8 }}>
          🔄 Comenzar de nuevo
        </button>
      </div>
    </div>
  );
}


