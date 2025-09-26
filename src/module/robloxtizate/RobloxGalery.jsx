import React, { useEffect, useState } from "react";

export default function RobloxGallery() {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [uploading, setUploading] = useState(false);

  // 🔹 Cargar imágenes existentes
  const fetchImages = () => {
    fetch("http://localhost:3001/api/uploads")
      .then((res) => res.json())
      .then((data) => setImages(data.files || []))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // 🔹 Subir imagen al backend
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const res = await fetch("http://localhost:3001/api/convert-avatar", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Avatar generado correctamente");
        fetchImages(); // refrescar galería
      } else {
        alert("❌ Error al generar avatar");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error al subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  if (images.length === 0) {
    return (
      <div>
        <h2>Galería de Avatares Roblox</h2>
        <p>No hay imágenes aún.</p>
        <input type="file" accept="image/*" onChange={handleUpload} />
      </div>
    );
  }

  return (
    <div>
      <h2>Galería de Avatares Roblox</h2>

      {/* Botón para subir */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
        />
        {uploading && <p>⏳ Subiendo y generando avatar...</p>}
      </div>

      {/* Galería */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {images.map((img) => (
          <img
            key={img}
            src={`http://localhost:3001/uploads/${img}`}
            alt={img}
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onClick={() => setSelected(`http://localhost:3001/uploads/${img}`)}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        ))}
      </div>

      {/* Modal de preview */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            cursor: "pointer",
          }}
        >
          <img
            src={selected}
            alt="Preview"
            style={{ maxHeight: "90%", maxWidth: "90%", borderRadius: "10px" }}
          />
        </div>
      )}
    </div>
  );
}
