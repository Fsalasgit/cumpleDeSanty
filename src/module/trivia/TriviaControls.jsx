export default function TriviaControls({ category, setCategory, level, setLevel, startTrivia }) {
  return (
    <div>
      <h3>⚙️ Configuración</h3>
      <div>
        <label>Categoría: </label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">-- Seleccionar --</option>
          <option value="matematica">Matemática</option>
          <option value="lengua">Lengua</option>
          <option value="naturales">Ciencias Naturales</option>
          <option value="sociales">Ciencias Sociales</option>
        </select>
      </div>
      <div>
        <label>Nivel: </label>
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="">-- Seleccionar --</option>
          <option value="facil">Fácil</option>
          <option value="intermedio">Intermedio</option>
          <option value="dificil">Difícil</option>
        </select>
      </div>
      <button onClick={startTrivia}>Comenzar</button>
    </div>
  );
}
