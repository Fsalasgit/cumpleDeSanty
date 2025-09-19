export default function StoryResult({ story /*, setStory */}) {
  // const copyStory = async () => {
  //   if (!story) return;
  //   try {
  //     await navigator.clipboard.writeText(story);
  //     alert("Historia copiada al portapapeles ✅");
  //   } catch {
  //     alert("No se pudo copiar (tu navegador no lo permite).");
  //   }
  // };

  // const downloadStory = () => {
  //   if (!story) return;
  //   const blob = new Blob([story], { type: "text/plain;charset=utf-8" });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = "historia_99_noches.txt";
  //   a.click();
  //   URL.revokeObjectURL(url);
  // };

  // if (!story) {
  //   return <div className="empty">Aquí aparecerá la historia generada.</div>;
  // }

  return (
    <div className="story-result">
      <pre className="story-box">{story}</pre>
      {/* <div className="story-ops">
        <button onClick={copyStory}>Copiar</button>
        <button onClick={downloadStory}>Descargar .txt</button>
        <button onClick={() => setStory("")}>Borrar</button>
      </div> */}
    </div>
  );
}
