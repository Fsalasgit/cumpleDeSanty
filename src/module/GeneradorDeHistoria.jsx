import React, { useState } from "react";
import { generateStoryFlow, storyToText } from "../storyData";

const GeneradorDeHistoria = ({ players }) => {
  const [storyCount, setStoryCount] = useState(3);
  const [storyNames, setStoryNames] = useState(["", "", ""]);
  const [generatedStory, setGeneratedStory] = useState("");

  const handleStoryCountChange = (n) => {
    const count = Math.max(1, Math.min(8, Number(n) || 1));
    setStoryCount(count);
    setStoryNames((prev) => {
      const copy = prev.slice(0, count);
      while (copy.length < count) copy.push("");
      return copy;
    });
  };

  const handleStoryNameChange = (idx, value) => {
    setStoryNames((prev) => {
      const copy = [...prev];
      copy[idx] = value;
      return copy;
    });
  };

  const generateStory = () => {
    const names = storyNames.map((s) => s.trim()).filter(Boolean);
    if (names.length === 0) return alert("Ingresá al menos un nombre.");
    const storyArray = generateStoryFlow(names);
    setGeneratedStory(storyToText(storyArray));
  };

  const copyStory = async () => {
    if (!generatedStory) return;
    try {
      await navigator.clipboard.writeText(generatedStory);
      alert("Historia copiada al portapapeles ✅");
    } catch {
      alert("No se pudo copiar.");
    }
  };

  const downloadStory = () => {
    if (!generatedStory) return;
    const blob = new Blob([generatedStory], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "historia_99_noches.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="story-section">
      <header>
        <h2>📝 Generador de historias — 99 Noches</h2>
        <p>Elegí cuántos personajes y poné sus nombres.</p>
      </header>

      <div className="story-controls">
        <label>
          Cantidad de personajes (1–8):
          <input
            type="number"
            min="1"
            max="8"
            value={storyCount}
            onChange={(e) => handleStoryCountChange(e.target.value)}
          />
        </label>

        <div className="names-list">
          {Array.from({ length: storyCount }).map((_, i) => (
            <input
              key={i}
              placeholder={`Nombre ${i + 1}`}
              value={storyNames[i] || ""}
              onChange={(e) => handleStoryNameChange(i, e.target.value)}
            />
          ))}
        </div>

        <div className="story-actions">
          <button onClick={generateStory}>Generar historia</button>
          <button
            onClick={() => {
              const pool = players.map((p) => p.name);
              if (pool.length === 0) return alert("No hay jugadores guardados.");
              const fill = Array.from({ length: storyCount }).map((_, i) => pool[i % pool.length]);
              setStoryNames(fill);
            }}
          >
            Autocompletar con jugadores
          </button>
        </div>
      </div>

      <div className="story-result">
        {generatedStory ? (
          <>
            <pre className="story-box">{generatedStory}</pre>
            <div className="story-ops">
              <button onClick={copyStory}>Copiar</button>
              <button onClick={downloadStory}>Descargar .txt</button>
              <button onClick={() => setGeneratedStory("")}>Borrar</button>
            </div>
          </>
        ) : (
          <div className="empty">Aquí aparecerá la historia generada.</div>
        )}
      </div>
    </section>
  );
};

export default GeneradorDeHistoria;

