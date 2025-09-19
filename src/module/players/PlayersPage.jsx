import { useState, useEffect } from "react";
import PlayerCard from "./PlayerCard";
import PlayerModal from "./PlayerModal";
import PlayerCreate from "./PlayerCreate";


const avatarOptions = ["/avatars/avatar.jpg", "/avatars/avatar2.jpg", "/avatars/avatar3.jpg"];
const initialPlayers = [];

export default function PlayersPage() {
  const [players, setPlayers] = useState(() => {
    const s = localStorage.getItem("rp_players");
    return s ? JSON.parse(s) : initialPlayers;
  });
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    localStorage.setItem("rp_players", JSON.stringify(players));
  }, [players]);

  const changeRobux = (id, delta) => {
    setPlayers(prev =>
      prev.map(p => (p.id === id ? { ...p, robux: Math.max(0, p.robux + delta) } : p))
    );
  };

  const redeem = id => {
    const p = players.find(x => x.id === id);
    const ans = prompt(`${p.name} tiene ${p.robux} Robux.\n¿Cuántos Robux querés canjear?`);
    const amount = Number(ans);
    if (!amount || amount <= 0) return alert("Cantidad inválida.");
    if (amount > p.robux) return alert("No tiene suficientes Robux.");
    changeRobux(id, -amount);
    alert(`${p.name} canjeó ${amount} Robux 🎁`);
  };

  const reset = () => {
    const password = prompt("Introduce la contraseña para resetear:");
    if (password !== "FelizCumpleSanti") {
      alert("Contraseña incorrecta. No se reseteó nada.");
      return;
    }

    if (!confirm("¿Resetear a valores iniciales?")) return;

    setPlayers(initialPlayers);
    localStorage.removeItem("rp_players");
    alert("Reseteado con éxito ✅");
  };


  const addPlayer = (name, avatar) => {
    const newPlayer = { id: Date.now(), name: name.trim(), robux: 150, avatar };
    setPlayers([...players, newPlayer]);
  };

  return (
    <>
      <header className="header">
        <h2>🎉 MI CUMPLE SANTIAGO</h2>
        <p>PARTICIPÁ Y ACUMULÁ ROBUX — canjealos por premios al final.</p>
      </header>

      {/* Botón para crear jugador */}
      <PlayerCreate avatarOptions={avatarOptions} onAdd={addPlayer} />

      <section className="grid">
        {players.map(p => (
          <PlayerCard
            key={p.id}
            p={p}
            changeRobux={changeRobux}
            redeem={redeem}
            setSelected={setSelectedPlayer}
          />
        ))}
      </section>

      <footer className="footer">
        <button className="reset" onClick={reset}>Resetear</button>
      </footer>

      {selectedPlayer && (
        <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
      )}
    </>
  );
}

