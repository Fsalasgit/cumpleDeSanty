import { useState } from "react";
import { storyModules } from "../../storyData";

export default function StoryEngine({ players }) {
  const [currentId, setCurrentId] = useState(1);

  const currentModule = storyModules.find((m) => m.id === currentId);

  if (!currentModule) {
    return (
      <div className="story-end">
        <h2>🌙 Fin de la aventura</h2>
        <button onClick={() => setCurrentId(1)}>Volver a empezar</button>
      </div>
    );
  }

  const names = players.map((p) => p.name).join(", ");
  const text = currentModule.text.replace("{names}", names);

  return (
    <div className="story-engine">
      <div className="players-avatars">
        {players.map((p) => (
          <img
            key={p.id}
            src={p.avatar}
            alt={p.name}
            title={p.name}
            style={{ width: 40, height: 40, borderRadius: "50%", margin: 4 }}
          />
        ))}
      </div>

      <h3>Noche {currentModule.id}</h3>
      <p>{text}</p>

      <div className="choices">
        {currentModule.choices.map((choice, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentId(choice.next)}
            disabled={choice.next === null}
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}


