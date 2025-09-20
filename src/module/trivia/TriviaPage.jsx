import { useState, useEffect } from "react";
import TriviaControls from "./TriviaControls";
import TriviaQuestion from "./TriviaQuestion";
import { triviaData } from "../../trivia";

export default function TriviaPage() {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [question, setQuestion] = useState(null);
  const [answeredLevels, setAnsweredLevels] = useState({}); 
  // { playerId: { matematica: ["facil", "intermedio"] } }

  useEffect(() => {
    const savedPlayers = JSON.parse(localStorage.getItem("rp_players") || "[]");
    setPlayers(savedPlayers);
  }, []);

  const startTrivia = () => {
    if (!selectedPlayer || !category || !level) {
      alert("Selecciona jugador, categoría y nivel.");
      return;
    }

    // Evitar repetir el mismo nivel
    if (answeredLevels[selectedPlayer?.id]?.[category]?.includes(level)) {
      alert("Ya jugaste ese nivel de esta categoría.");
      return;
    }

    const qList = triviaData[category]?.[level];
    if (!qList || qList.length === 0) {
      alert("No hay preguntas en esta categoría/nivel.");
      return;
    }

    // 👉 Tomamos una pregunta random
    const randomIndex = Math.floor(Math.random() * qList.length);
    setQuestion(qList[randomIndex]);
  };

  const handleAnswer = (option) => {
    if (!question) return;

    const isCorrect = option === question.answer;

    if (isCorrect) {
      alert("✅ Correcto! Ganaste " + question.reward + " robux.");
      const updatedPlayers = players.map((p) =>
        p.id === selectedPlayer.id
          ? { ...p, robux: p.robux + question.reward }
          : p
      );
      setPlayers(updatedPlayers);
      localStorage.setItem("rp_players", JSON.stringify(updatedPlayers));
    } else {
      alert("❌ Incorrecto.");
    }

    // 👉 Marcar nivel como jugado
    setAnsweredLevels((prev) => {
      const updated = { ...prev };
      if (!updated[selectedPlayer.id]) updated[selectedPlayer.id] = {};
      if (!updated[selectedPlayer.id][category])
        updated[selectedPlayer.id][category] = [];
      updated[selectedPlayer.id][category].push(level);
      return updated;
    });

    setQuestion(null); // limpiar después de responder
  };

  return (
    <section>
      <h2>🎮 Trivia</h2>

      <div>
        <label>Jugador: </label>
        <select
          value={selectedPlayer?.id || ""}
          onChange={(e) =>
            setSelectedPlayer(players.find((p) => p.id === Number(e.target.value)))
          }
        >
          <option value="">-- Seleccionar --</option>
          {players.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.robux} robux)
            </option>
          ))}
        </select>
      </div>

      <TriviaControls
        category={category}
        setCategory={setCategory}
        level={level}
        setLevel={setLevel}
        startTrivia={startTrivia}
      />

      {question && (
        <TriviaQuestion question={question} handleAnswer={handleAnswer} />
      )}
    </section>
  );
}
