import { useState, useEffect } from "react";
import StoryControls from "./StoryControls";
import StoryResult from "./StoryResult";
import { generateStoryFlow } from "../../storyData";

export default function StoryPage() {
  const [players, setPlayers] = useState([]);
  const [storyCount, setStoryCount] = useState(3);
  const [storyNames, setStoryNames] = useState(["", "", ""]);
  const [generatedStory, setGeneratedStory] = useState("");

  // Cargar jugadores desde localStorage al iniciar
  useEffect(() => {
    const savedPlayers = JSON.parse(localStorage.getItem("rp_players") || "[]");
    setPlayers(savedPlayers);
  }, []);

  const generateStory = () => {
    const names = storyNames.map(s => s.trim()).filter(Boolean);
    if (names.length === 0) return alert("Ingresá al menos un nombre.");
    const storyArray = generateStoryFlow(names);
    const storyText = storyArray
      .map((m, i) => `Noche ${i + 1}:\n${m.text}\nOpciones: ${m.choices.join(" | ")}\n`)
      .join("\n");
    setGeneratedStory(storyText);
  };

  return (
    <section className="story-section">
      <header>
        <h2>📝 Generador de historias — 99 Noches</h2>
      </header>

      <StoryControls
        storyCount={storyCount}
        storyNames={storyNames}
        setStoryCount={setStoryCount}
        setStoryNames={setStoryNames}
        generateStory={generateStory}
        players={players}
      />

      <StoryResult story={generatedStory} setStory={setGeneratedStory} />
    </section>
  );
}

