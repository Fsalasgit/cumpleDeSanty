export default function PlayerCard({ p, changeRobux, redeem, setSelected }) {
  return (
    <article className="card">
      <img
        src={p.avatar}
        alt={`${p.name} avatar`}
        className="avatar"
        onClick={() => setSelected(p)}
        style={{ cursor: "pointer" }}
      />
      <h3 className="player-name">{p.name.toUpperCase()}</h3>

      <div className="robux">
        <span className="coin" aria-hidden>
          🪙
        </span>
        <span className="robux-number">{p.robux} Robux</span>
      </div>

      <div className="controls">
        <button onClick={() => changeRobux(p.id, 10)}>+ 10</button>
        <button onClick={() => changeRobux(p.id, 50)}>+ 50</button>
        <button onClick={() => changeRobux(p.id, -10)}>- 10</button>
      </div>

      <div className="actions">
        <button className="redeem" onClick={() => redeem(p.id)}>
          Canjear 🎁
        </button>
      </div>
    </article>
  );
}
