export default function PlayerModal({ player, onClose }) {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={player.avatar} alt="avatar grande" />
        <h2>{player.name}</h2>
        <p>Robux: {player.robux}</p>
        <div style={{ marginTop: 12 }}>
          <button className="close-btn" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
