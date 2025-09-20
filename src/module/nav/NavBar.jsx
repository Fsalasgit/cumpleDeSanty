export default function NavBar({ tab, setTab }) {
  return (
    <nav className="top-nav">
      <div className="nav-left">
        <h1 className="brand">🎉 99 Noches - Cumple</h1>
      </div>
      <div className="nav-right">
        <button className={tab === "players" ? "tab active" : "tab"} onClick={() => setTab("players")}>
          Jugadores
        </button>
        <button className={tab === "story" ? "tab active" : "tab"} onClick={() => setTab("story")}>
          Generador de historias
        </button>
        <button className={tab === "trivia" ? "tab active" : "tab"} onClick={() => setTab("trivia")}>
          Trivia
        </button>
      </div>
    </nav>
  );
}
