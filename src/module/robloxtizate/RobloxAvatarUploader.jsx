import { useState } from "react";
import RobloxGallery from "./RobloxGalery";

export default function RobloxAvatarUploader() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);
  const [error, setError] = useState(null);

  function handleFileChange(e) {
    const f = e.target.files && e.target.files[0];
    setError(null);
    setResultUrl(null);
    if (!f) return setFile(null);

    if (!f.type.startsWith("image/")) return setError("Por favor subí una imagen.");
    if (f.size > 8 * 1024 * 1024) return setError("Archivo demasiado grande (máx 8 MB).");

    setFile(f);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(f);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!file) return setError("Seleccioná una foto primero.");
    if (!consent) return setError("Debés aceptar el consentimiento.");

    setLoading(true);
    setResultUrl(null);

    try {
      const form = new FormData();
      form.append("photo", file);

      const res = await fetch("http://localhost:3001/api/convert-avatar", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error en el servidor");
      }

      const data = await res.json();
      if (data && data.avatarUrl) {
        setResultUrl(data.avatarUrl);
      } else {
        throw new Error("El servidor no devolvió un avatar.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Error inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h2>🕹️ Robloxtízate</h2>
      <p className="text-sm text-gray-600 mb-4">
        Subí una foto y generá tu avatar estilo Roblox (tema: 99 Noches en el Bosque).
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">
            <span className="text-sm font-medium">Elegí foto (máx 8 MB)</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block mt-2"
            />
          </label>
        </div>

        {preview && (
          <div className="border rounded p-2">
            <p className="text-xs text-gray-500">Vista previa</p>
            {/* <img
              src={preview}
              alt="preview"
              className="max-w-[200px] max-h-[200px] object-contain rounded mt-2"
            /> */}
          </div>
        )}

        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1"
          />
          <div>
            <div className="text-sm font-medium">Confirmo que soy el padre/madre/tutor legal.</div>
            <div className="text-xs text-gray-500">
              Doy consentimiento para subir y procesar la foto solo con fines de generar el avatar.
            </div>
          </div>
        </label>

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
          >
            {loading ? "Generando..." : "Generar avatar"}
          </button>

          <button
            type="button"
            onClick={() => {
              setFile(null);
              setPreview(null);
              setConsent(false);
              setResultUrl(null);
              setError(null);
            }}
            className="px-4 py-2 border rounded"
          >
            Reset
          </button>
        </div>
      </form>

      {resultUrl && (
        <div className="mt-6">
          <h3 className="font-medium mb-2">Avatar generado</h3>
          <img
            src={resultUrl}
            alt="generated avatar"
            className="max-w-[250px] max-h-[250px] object-contain rounded shadow"
          />
          <div className="mt-2 text-sm text-gray-600">
            Click derecho para guardar la imagen y usarla en invitaciones o decoraciones 🎉
          </div>
        </div>
      )}
      <RobloxGallery />
    </section>
  );
}
